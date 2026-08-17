/**
 * The Canada leg: out over the Blue Water Bridge Saturday evening 9/19, back
 * through the Detroit–Windsor Tunnel Sunday afternoon 9/20.
 *
 * Under 48 hours in-country, which is short enough that it's tempting to treat
 * it casually — and is exactly why the duty exemption drops, the roaming bills
 * start, and the rental paperwork gets skipped. Verified August 2026.
 */

export const BORDER = {
  critical: [
    {
      level: "stop",
      title: "The word “gummies” has to be settled before you leave",
      body:
        "Mom's document lists “sleep aids (earplugs, gummies…)” under things to bring. If those are THC gummies, carrying them across either border is a federal offence in both directions — legal status in Michigan and legal status in Canada are both irrelevant at the line. This is the single largest risk on the whole trip, and it is entirely avoidable.",
      fix:
        "Melatonin only, in its original labelled retail bottle, packed where it's easy to show. No cannabis or CBD in any form — gummies, tinctures, vapes, topicals, or a forgotten leftover in a bag. Physically check the luggage and the rental's glovebox and console before the bridge on 9/19. If someone realises late, dispose of it in the US before the approach lanes; handing it over at the booth still draws a penalty. And answer officers truthfully — lying is a worse offence than possession.",
    },
    {
      level: "stop",
      title: "Ask the awkward question in August, not at the toll booth",
      body:
        "A DUI or other criminal conviction — even an old one — can get someone refused entry to Canada outright, with a non-refundable hotel booked on the far side and a Saturday night to salvage. It takes five minutes to ask now and is very unpleasant to discover at the Blue Water Bridge.",
      fix:
        "Raise it quietly and privately with Mom and Mikaela before the trip. If there's anything, a Temporary Resident Permit or Criminal Rehabilitation takes time to arrange — so ask early. If it can't be resolved, the whole Canada leg is replaceable: Port Huron down M-25 through the Thumb to Detroit keeps you in the US, with an overnight in Port Huron or Lexington instead.",
    },
    {
      level: "warn",
      title: "Illinois doesn't issue Enhanced Driver's Licenses — passports are the only option",
      body:
        "Several states offer an EDL that works for a land crossing. Illinois is not one of them, so all three of you need a passport book or passport card. There is no fallback document.",
      fix:
        "Lay out all three passports now and check every expiry date. Canada doesn't require six months' validity for US citizens, but an expired book is worthless. Photograph each data page and keep the images available offline. A passport card is cheaper and faster than a book and is fully valid for this crossing — but routine processing runs weeks, so this is an August problem, not a September one.",
    },
  ],

  crossings: [
    {
      id: "bwb",
      when: "Sat 9/19",
      name: "Blue Water Bridge",
      from: "Port Huron, Michigan",
      to: "Point Edward / Sarnia, Ontario",
      toll: "USD $5 car",
      wait: "10–30 min, Saturday evening",
      tags: ["Cashless since 2025", "Card in hand"],
      notes:
        "Michigan collects the toll into Canada on the US side — $5 flat for a car, confirmed against MDOT's own rate table; coming back, the Federal Bridge Corporation charges CA$7 by card. Fully cashless since April 1, 2025 — no attendant will take your cash in either direction. Have a credit card in the driver's door pocket on approach, and make sure your bank won't decline it as suspicious foreign activity. Check live waits from the car about 45 minutes out on the CBSA and CBP wait-time pages, and build a 45-minute buffer into the Sarnia arrival rather than the 15 minutes the itinerary implies. Don't book a hard-time dinner in Sarnia before 7:30pm.",
      source: "Blue Water Bridge (Federal Bridge Corporation) — toll rates",
      sourceUrl: "https://bluewaterbridge.ca/toll-rates/",
    },
    {
      id: "tunnel",
      when: "Sun 9/20",
      name: "Detroit–Windsor Tunnel",
      from: "Windsor, Ontario",
      to: "Downtown Detroit, Michigan",
      toll: "USD $8.25 car",
      wait: "15–40 min, Sunday afternoon",
      tags: ["Cashless", "Height limit", "Exits downtown"],
      notes:
        "$8.25 at the kiosk going Windsor to Detroit — or $5.00 through the DWT mobile app, which is worth installing in the hotel the night before. Cash is not accepted in either currency, so leftover Canadian bills can't be spent here. The tunnel surfaces at Jefferson and Randolph, a block from Hart Plaza and four from The Belt, which is why it beats the Ambassador Bridge if downtown comes first; the bridge is better only if you're going straight to Dearborn. Anything 8 feet or taller gets reclassified and charged far more — irrelevant for a sedan, worth knowing if Budget hands you a tall van. Fill the tank in Detroit right after clearing US customs; Ontario fuel is meaningfully more expensive.",
      source: "Detroit Windsor Tunnel — toll rates",
      sourceUrl: "https://www.dwtunnel.com/toll-rates/",
    },
  ],

  documents: [
    {
      id: "passports",
      text: "Three valid passport books, expiry dates checked",
      note: "Illinois has no Enhanced Driver's License option — there is no substitute",
    },
    {
      id: "passport-photos",
      text: "Photograph every passport data page, saved offline",
      note: "Not in a cloud album you'll need signal to open",
    },
    {
      id: "cbsa-questions",
      text: "Agree who answers the officer's questions — the driver",
      note: "Have the Sarnia hotel confirmation and your return date ready to state",
    },
    {
      id: "insurance-card",
      text: "Canadian Non-Resident Insurance Card in the glovebox",
      note: "Ask Budget for it at the 9/14 pickup; print backups from the avis.ca link too",
    },
    {
      id: "no-fx-card",
      text: "Pick one no-foreign-transaction-fee credit card as the Canada card",
      note: "Plus a backup, in case one declines at a toll booth",
    },
    {
      id: "bank-notice",
      text: "Tell both card issuers you'll be in Canada 9/19–9/20",
      note: "A declined tap in a cashless toll lane is a genuinely bad time",
    },
    {
      id: "roaming",
      text: "Each person checks their own plan's Canada terms",
      note: "This varies by plan, not just carrier — see below",
    },
    {
      id: "offline-maps",
      text: "Download offline maps for Sarnia, Windsor and Detroit",
      note: "Protects navigation if a phone throttles or roaming is misconfigured",
    },
    {
      id: "search-bags",
      text: "Physically search the luggage and the car before the bridge",
      note: "Glovebox and centre console included",
    },
  ],

  rental: [
    {
      title: "Tell Budget at pickup — Monday 9/14, 9pm, at O'Hare",
      status: "Do this first",
      statusTone: "stop",
      body:
        "This is five days before you cross, and it's the step people forget — now made worse by the flights, because pickup is a 9pm airport counter after six hours in the air rather than a quiet suburban branch at seven. Say the words “we are driving this into Ontario” before they start typing, and physically confirm the Canadian Non-Resident Insurance Card is in your hand before you leave the garage. Before the 14th, open the O'Hare Budget location's page, expand Terms & Conditions and click “Travel Into Other Countries” to confirm that branch permits it — or call Budget's cross-border line at 800-218-7992. Do that call in daylight, not at the desk.",
      source: "Budget — Travel Into Other Countries terms",
      sourceUrl: "https://www.budget.com/en/help/usa-faqs/cross-into-canada",
    },
    {
      title: "Mom's document quotes Avis policy for a Budget rental",
      status: "Actually fine",
      statusTone: "ok",
      body:
        "The avis.ca PDF link in the document is live and current — policy BUA 7001700830, Continental Casualty Company, effective 7/1/2026 to 7/1/2027, named insured PV Holding Corp. PV Holding is the entity that titles both Avis and Budget vehicles in the US, so the card does apply. Print four copies anyway and keep one in the glovebox for the whole trip.",
      source: "Avis Budget Group — Canadian Non-Resident Insurance Card",
      sourceUrl:
        "https://www.avis.ca/content/dam/avis/na/ca/common/pdf-files/abg__canada_non_resident_card.pdf",
    },
    {
      title: "Costco's additional-driver waiver",
      status: "Worth confirming",
      statusTone: "warn",
      body:
        "Mom's note that Costco members get one additional driver free is broadly right but is location-dependent — “at participating locations.” With three adults and two 300-mile days, having a second named driver is worth the phone call to confirm before pickup.",
      source: "Costco Travel — car rental benefits",
      sourceUrl: "https://www.costcotravel.com/Info/Rental-Cars-FAQs",
    },
  ],

  practical: [
    {
      label: "Always choose CAD",
      value: "At every terminal",
      note: "“Pay in USD or CAD?” — picking USD is dynamic currency conversion and costs you 3–5%",
    },
    {
      label: "Canadian cash needed",
      value: "≈ CAD $40",
      note: "From an ATM once you're there. Don't buy CAD in advance",
    },
    {
      label: "Speed limits",
      value: "km/h",
      note: "100 km/h on the 402 is 62 mph. The rental's speedo may not show km",
    },
    {
      label: "Fuel",
      value: "Per litre",
      note: "“161.9” is cents per litre — about $4.40 USD/gal. Fill up in Port Huron instead",
    },
    {
      label: "Right on red",
      value: "Legal in Ontario",
      note: "Except where posted — and never in Montreal, which isn't your problem this trip",
    },
    {
      label: "Sunset in Sarnia",
      value: "≈ 7:45pm",
      note: "The Point Edward waterfront walk only works if you clear the bridge by about 7pm",
    },
  ],

  contraband: [
    {
      level: "stop",
      title: "Cannabis, in any form, in either direction",
      body:
        "Federal offence crossing into Canada and crossing back into the US, regardless of what's legal on either side. This includes CBD, vapes, and edibles. See the flag at the top of this page — it's the one thing on this trip that can end badly rather than just inconveniently.",
    },
    {
      level: "warn",
      title: "Under 48 hours cuts your exemption to $200 and alcohol to 150 mL",
      body:
        "You'll be in Canada roughly 20 hours. That drops the US duty-free personal exemption from $800 to $200 per person, and the alcohol allowance from 1 litre to 150 millilitres — a shot glass. Skip the duty-free liquor shop entirely; the saving doesn't survive the duty. Keep any purchases under $200 each, keep receipts, and declare everything honestly at the tunnel. A small duty is trivial; an undeclared item is not.",
    },
    {
      level: "warn",
      title: "Eat or bin the fruit before both crossings",
      body:
        "Almost all fresh fruit and vegetables are prohibited entering the US. Citrus, tomatoes and peppers can't come back even if they were US-grown and you merely carried them into Canada. Clear the cooler out before the Blue Water Bridge on Saturday and again before the tunnel on Sunday.",
    },
    {
      level: "info",
      title: "Your phone may start roaming while still in Michigan",
      body:
        "Towers reach across the river. Bills can start near Port Huron on Saturday and in downtown Detroit on Sunday, before and after you're actually in Canada. Verizon's current Unlimited plans include Canada at no extra cost with 5 GB of high-speed data; older Verizon plans use TravelPass at $6/day; AT&T's International Day Pass runs about $12/day and T-Mobile's about $5/day. If anyone's plan doesn't include Canada, turn data roaming off until you're across on 9/19 and off again right after the tunnel on 9/20.",
    },
  ],
};
