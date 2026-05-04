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
    {
        "slug": "about-us",
        "src": "about.html",
        "title": "About Us",
        "description": "Meet Michael Rodriguez, owner of Trailside Handyman and Remodeling. 10+ years of carpentry, tile, drywall, electrical and plumbing experience across Denver metro.",
        "nav_active": "about",
    },
    {
        "slug": "our-services",
        "src": "services-index.html",
        "title": "Our Services",
        "description": "Explore Trailside's handyman and remodeling services — repairs, installs, full remodels, doors, plumbing, electrical, and drywall across Denver metro.",
        "nav_active": "services",
    },
    {
        "slug": "our-services/handyman-trailside",
        "src": "services-handyman.html",
        "title": "Handyman Services",
        "description": "Trailside's handyman services in Denver metro: repairs, installs, fixtures, fans, lights, drywall patches, and the small projects that make your home feel finished.",
        "nav_active": "services",
    },
    {
        "slug": "our-services/plumbing-trailside-handyman",
        "src": "services-plumbing.html",
        "title": "Plumbing Installs and Repairs",
        "description": "Trailside's plumbing services: faucets, toilets, fixtures, sinks, garbage disposals, showers and leak repair across Denver metro.",
        "nav_active": "services",
    },
    {
        "slug": "our-services/doors_repairs_new_doors",
        "src": "services-doors.html",
        "title": "Door Repairs and New Door Installs",
        "description": "Interior, exterior, storm, patio, French, cabinet, doggy and barn door installation and repair across Denver metro.",
        "nav_active": "services",
    },
    {
        "slug": "our-services/trailsidebathroomandbasementremodel",
        "src": "services-remodel.html",
        "title": "Bathroom and Basement Remodels",
        "description": "Custom bathroom and basement remodels — design, demo, build and final punch list under one trusted Denver metro contractor.",
        "nav_active": "services",
    },
    {
        "slug": "portfoliohandyman",
        "src": "portfolio.html",
        "title": "Portfolio",
        "description": "Take a look at 10+ years of completed Trailside Handyman work — handyman jobs, remodels, doors, plumbing, electrical, and drywall projects across Denver metro.",
        "nav_active": "portfolio",
    },
]
