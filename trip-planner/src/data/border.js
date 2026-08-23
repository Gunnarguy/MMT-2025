/**
 * The Canada leg: out over the Blue Water Bridge Saturday evening 9/19, back
 * through the Detroit–Windsor Tunnel Sunday afternoon 9/20.
 *
 * Verified August 2026.
 */

export const BORDER = {
  critical: [
    {
      level: "info",
      title: "Passports required for all 3 passengers",
      body:
        "All three travelers need a valid US passport book or passport card for land border crossing into Ontario and returning to the US.",
      fix:
        "Double-check expiry dates before departure. While Canada does not require six months of remaining validity for US citizens, passports must be valid for the entire length of stay.",
    },
    {
      level: "warn",
      title: "Request Budget Canadian Insurance Card at pickup",
      body:
        "When collecting the rental at O'Hare MMF on Monday 9/14, notify the counter agent that you will be driving into Ontario on Saturday 9/19.",
      fix:
        "Request the free Canadian Non-Resident Insurance Card and keep a copy in the glovebox alongside your rental contract.",
    },
    {
      level: "info",
      title: "Cashless tolls at both international crossings",
      body:
        "Both the Blue Water Bridge ($5.00 USD) and Detroit–Windsor Tunnel (CA$8.25 / $5.00 app) are completely cashless plazas.",
      fix:
        "Keep a credit card or Apple Pay accessible in the driver's door pocket for tap-to-pay at the toll booths.",
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
      wait: "10–25 min, Saturday evening",
      tags: ["Cashless", "Card / Tap in hand"],
      notes:
        "Michigan collects the $5 USD flat toll on the US approach before crossing the twin suspension spans. Cash is not accepted. Have credit card ready to tap. CBSA primary inspection is on the Canadian side at Point Edward.",
      source: "Blue Water Bridge (Federal Bridge Corporation) — toll rates",
      sourceUrl: "https://bluewaterbridge.ca/toll-rates/",
    },
    {
      id: "tunnel",
      when: "Sun 9/20",
      name: "Detroit–Windsor Tunnel",
      from: "Windsor, Ontario",
      to: "Downtown Detroit, Michigan",
      toll: "CA$8.25 car",
      wait: "15–30 min, Sunday afternoon",
      tags: ["Cashless", "Exits Downtown Detroit"],
      notes:
        "CA$8.25 by card at the Windsor kiosk (or $5.00 USD via the DWT app). Drive through the 5,160-foot sub-river tunnel directly into downtown Detroit at Jefferson & Randolph.",
      source: "Detroit Windsor Tunnel — toll rates",
      sourceUrl: "https://www.dwtunnel.com/toll-rates/",
    },
  ],

  documents: [
    {
      id: "passports",
      text: "Three valid US passport books or cards",
      note: "Required for crossing into Ontario and re-entering the US",
    },
    {
      id: "passport-photos",
      text: "Save offline photo copies of passport data pages",
      note: "Good travel practice stored in phone camera roll",
    },
    {
      id: "cbsa-questions",
      text: "Hotel confirmation and 1-night stay length ready to state",
      note: "Four Points / The Insignia Hotel in Sarnia",
    },
    {
      id: "insurance-card",
      text: "Canadian Non-Resident Insurance Card in the glovebox",
      note: "Provided free by Budget counter at O'Hare pickup",
    },
    {
      id: "no-fx-card",
      text: "No-foreign-transaction-fee credit card in driver's console",
      note: "For bridge tolls and hotel check-in",
    },
    {
      id: "bank-notice",
      text: "Travel notice on credit cards for Canada (9/19–9/20)",
      note: "Ensures seamless card acceptance across the border",
    },
    {
      id: "roaming",
      text: "Confirm phone carrier includes Canada roaming",
      note: "Verizon/AT&T/T-Mobile modern plans include Canada data",
    },
    {
      id: "offline-maps",
      text: "Download offline Google/Apple maps for Sarnia & Windsor",
      note: "Guarantees turn-by-turn navigation across border corridors",
    },
  ],

  rental: [
    {
      title: "Tell Budget at pickup — Monday 9/14, 9pm, at O'Hare",
      status: "At pickup",
      statusTone: "ok",
      body:
        "When picking up the Mazda CX-50 at O'Hare MMF, let the Budget agent know you will drive into Ontario for one night. They will issue the standard Canadian Non-Resident Insurance Card.",
      source: "Budget — Travel Into Other Countries terms",
      sourceUrl: "https://www.budget.com/en/help/usa-faqs/cross-into-canada",
    },
    {
      title: "Avis & Budget Canadian insurance documentation",
      status: "Verified",
      statusTone: "ok",
      body:
        "PV Holding Corp titles both Avis and Budget vehicles in the US. Standard ABG Canadian Non-Resident Insurance coverage applies across Ontario.",
      source: "Avis Budget Group — Canadian Non-Resident Insurance Card",
      sourceUrl:
        "https://www.avis.ca/content/dam/avis/na/ca/common/pdf-files/abg__canada_non_resident_card.pdf",
    },
    {
      title: "Costco Travel additional driver benefit",
      status: "Included",
      statusTone: "ok",
      body:
        "Costco Travel reservations include one additional authorized driver at no extra daily charge.",
      source: "Costco Travel — car rental benefits",
      sourceUrl: "https://www.costcotravel.com/Info/Rental-Cars-FAQs",
    },
  ],

  practical: [
    {
      label: "Always choose CAD",
      value: "At card terminals",
      note: "Selecting CAD avoids dynamic currency conversion markups",
    },
    {
      label: "Canadian cash",
      value: "Minimal / Optional",
      note: "Card and contactless tap are accepted everywhere in Ontario",
    },
    {
      label: "Speed limits",
      value: "km/h",
      note: "100 km/h on Highway 402 is 62 mph; 80 km/h is 50 mph",
    },
    {
      label: "Fuel pricing",
      value: "Per litre",
      note: "Port Huron gas (~$3.55/gal) is cheaper than Ontario (~$4.40/gal)",
    },
    {
      label: "Right turn on red",
      value: "Permitted in Ontario",
      note: "Allowed after a complete stop unless signage indicates otherwise",
    },
    {
      label: "Sunset in Sarnia",
      value: "≈ 7:45 PM EDT",
      note: "Waterfront park at Point Edward is a prime evening sunset spot",
    },
  ],

  contraband: [
    {
      level: "warn",
      title: "Standard cross-border customs regulations",
      body:
        "Cross-border transit between the US and Canada is subject to federal customs inspections. Do not transport cannabis, CBD products, weapons, or undeclared agricultural goods across the international boundary in either direction.",
    },
    {
      level: "info",
      title: "Personal duty-free exemptions for 24-hr stays",
      body:
        "For stays under 48 hours, the US duty-free personal exemption is $200 per traveler. Declare all Canadian souvenir and retail purchases at US customs.",
    },
    {
      level: "info",
      title: "Fresh produce guidelines",
      body:
        "Fresh citrus, whole fruits, and certain vegetables cannot be brought across the border into the US. Finish or discard any fresh fruit snacks before the return crossing.",
    },
  ],
};
