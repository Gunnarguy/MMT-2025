// Place labels in screen pixels without moving their geographic markers.
export function layoutMapLabels(items, width, height, obstacles = []) {
  const occupied = [...obstacles];
  return items.map(item => {
    const w = Math.min(item.width, width - 12), h = item.height;
    let best;
    for (const dy of [-32, -54, 26, -76, 48, -98, 70]) {
      for (const dx of [0, w * .6, -w * .6, w, -w, w * 1.5, -w * 1.5]) {
        const x = Math.max(6 + w / 2, Math.min(width - 6 - w / 2, item.x + dx));
        const y = Math.max(6 + h / 2, Math.min(height - 6 - h / 2, item.y + dy));
        const rect = {left:x-w/2-3, right:x+w/2+3, top:y-h/2-2, bottom:y+h/2+2};
        const overlap = occupied.reduce((sum, r) => sum + Math.max(0, Math.min(r.right,rect.right)-Math.max(r.left,rect.left)) * Math.max(0, Math.min(r.bottom,rect.bottom)-Math.max(r.top,rect.top)), 0);
        const score = overlap * 1000 + Math.hypot(x-item.x, y-item.y) + (dy > 0 ? 12 : 0);
        if (!best || score < best.score) best = {x,y,rect,score};
      }
    }
    occupied.push(best.rect);
    return {...item, labelX:best.x, labelY:best.y};
  });
}
