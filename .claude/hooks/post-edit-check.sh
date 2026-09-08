#!/usr/bin/env bash
# PostToolUse hook for Edit|Write in MMT-2025.
# After an edit under trip-planner/, lints the edited JS/JSX file (if any) and runs
# `npm run build` (1.16 s median). Emits only failures, as additionalContext for Claude.
# Never blocks. Always exits 0.
# Stdin: the hook JSON; the edited path is tool_input.file_path.
set +e

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
APP="$ROOT/trip-planner"

FILE="$(python3 -c 'import json,sys
try:
    print(json.load(sys.stdin).get("tool_input", {}).get("file_path", ""))
except Exception:
    print("")' 2>/dev/null)"
[ -n "$FILE" ] || exit 0

case "$FILE" in
  /*) case "$FILE" in "$ROOT"/*) REL="${FILE#"$ROOT"/}" ;; *) exit 0 ;; esac ;;
  *) REL="$FILE" ;;
esac

# Only the app's own source and config; not dist/, node_modules/, archive/ or the docs.
case "$REL" in
  trip-planner/src/*|trip-planner/scripts/*|trip-planner/index.html|trip-planner/vite.config.js|trip-planner/eslint.config.js|trip-planner/package.json) ;;
  *) exit 0 ;;
esac

cd "$APP" || exit 0
[ -d node_modules ] || exit 0

if command -v gtimeout >/dev/null 2>&1; then TO="gtimeout 50"; else TO=""; fi

STEP="npm run build"
OUT=""
RC=0
case "$REL" in
  *.js|*.jsx|*.mjs)
    STEP="npx --no-install eslint $REL"
    OUT="$($TO npx --no-install eslint "$ROOT/$REL" 2>&1)"
    RC=$?
    ;;
esac
if [ "$RC" -eq 0 ]; then
  STEP="npm run build"
  OUT="$($TO npm run build 2>&1)"
  RC=$?
fi
[ "$RC" -eq 0 ] && exit 0

TAIL="$(printf '%s\n' "$OUT" | tail -n 40 | cut -c1-400)"
python3 - "$REL" "$RC" "$STEP" "$TAIL" <<'PY'
import json, sys
rel, rc, step, tail = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
msg = (f"post-edit check FAILED (exit {rc}) after editing {rel}: {step} in trip-planner/\n"
       f"{tail}\nFix this before reporting done. Rerun `cd trip-planner && npm run build` to confirm.")
print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": msg}}))
PY
exit 0
