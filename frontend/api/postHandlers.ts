export async function createMovie(backdrops: Array<File>,
    posters: Array<File>,
    main_page_banner: File | undefined,
    // main_page_collections: ,
    name: string,
    release_date: Date | undefined,
    duration: string,
    categories: Array<string>,
    director: string,
    writer: string,
    trailer: string,
    overview: string,
    cast: Array<{ id: string, role: string }>,
    gallery: Array<File>,
    country_origin: Array<string>,
    filming_location: Array<string>,
    production_companies: Array<string>,
    budget: string,
    gross_profit: string,
    streaming_service: { service: string, link: string } | null) {
    const form = new FormData()

    form.append("name", name)

    console.log(release_date)

    if (release_date) {
        const month = release_date.getUTCMonth() <= 9 ? `0${release_date.getUTCMonth()}` : release_date.getUTCMonth()
        const day = release_date.getUTCDay() <= 9 ? `0${release_date.getUTCDay()}` : release_date.getUTCDay()
        form.append("release_date", `${release_date.getUTCFullYear}-${month}-${day}`)
        form.append("duration", duration)
    }
    else {
        return "Error, no release date selected"
    }

    categories.forEach(categories => {
        form.append("categories", categories)
    });

    form.append("producers", `{"name":"${director}","producer_role":["Director"]}`)
    form.append("producers", `{"name":"${writer}","producer_role":["Writer"]}`)
    form.append("trailer", trailer)
    form.append("overview", overview)

    cast.forEach(cast =>
        form.append("cast", `{"actor":"${cast.id}","role":"${cast.role}"}`)
    )

    country_origin.forEach(country =>
        form.append("country_origin", country)
    )

    filming_location.forEach(location =>
        form.append("filming_location", location)
    )

    production_companies.forEach(company =>
        form.append("production_companies", company)
    )

    form.append("budget", budget)
    form.append("gross_profit", gross_profit)

    if (streaming_service) {

        form.append("streaming_service", `{"service":"${streaming_service.service}","link":"${streaming_service.link}"}`)
    }

    backdrops.forEach(backdrop =>
        form.append("backdrops", backdrop)
    )

    posters.forEach(poster =>
        form.append("psoters", poster)
    )

    gallery.forEach(image =>
        form.append("gallery", image)
    )

    if (main_page_banner) {
        form.append("main_page_banner", main_page_banner)
    }
    else {
        return "Error, no main page banner uploaded"
    }

    try {
        const response = await fetch("http://localhost:8000/movies/", {
            method: "POST",
            // Set the FormData instance as the request body
            body: form,
        });
        console.log(await response.json());
    } catch (e) {
        console.error(e);
    }
}