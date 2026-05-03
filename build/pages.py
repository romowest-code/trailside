"""Page registry for the Trailside Handyman site rebuild.

Each page is a dict with:
  - slug:         URL slug. Empty string for the homepage. Trailing slash is added by build.py.
  - src:          filename in build/pages/ holding the body HTML.
  - title:        short page title (used for <h1> context, og:title prefix).
  - title_full:   full <title> tag value. If None, defaults to "<title> - Trailside Handyman and Remodeling".
  - description:  meta description.
  - nav_active:   which nav link to highlight (home | about | services | portfolio | schedule | "").
"""

PAGES = [
    {
        "slug": "",
        "src": "home.html",
        "title": "Home",
        "title_full": "Trailside Handyman and Remodeling - Denver Metro Repairs, Installs, Remodels",
        "description": "Trailside Handyman and Remodeling — Denver metro's trusted handyman & remodeling team. Repairs, installs, and full remodels done right, start to finish.",
        "nav_active": "home",
    },
    # Phase 2 pages will be appended here:
    # {"slug": "about-us", "src": "about.html", ...},
    # {"slug": "our-services", "src": "services-index.html", ...},
    # {"slug": "our-services/handyman-trailside", "src": "services-handyman.html", ...},
    # {"slug": "our-services/plumbing-trailside-handyman", "src": "services-plumbing.html", ...},
    # {"slug": "our-services/doors_repairs_new_doors", "src": "services-doors.html", ...},
    # {"slug": "our-services/trailsidebathroomandbasementremodel", "src": "services-remodel.html", ...},
    # {"slug": "portfoliohandyman", "src": "portfolio.html", ...},
]
