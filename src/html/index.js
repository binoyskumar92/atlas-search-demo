const backendUrl = 'http://localhost:6767';
async function search() {
    try {
        const searchInput = document.getElementById('search-input').value
        if (searchInput) {
            const response = await fetch(`${backendUrl}/search/${getCheckedRadioButtonLabelValue()}/${searchInput}`);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            let output = ''; 
            data.forEach(e => {
                output +=
`                    <div class="flex justify-between border p-3 m-1 space-x-10 rounded-md bg-[#ebf3d8]">

                        <div class="flex flex-col">
                            <div class="flex">
                                <label class="font-bold">Movie name:&nbsp</label>
                                <div>${e.title}</div>
                            </div>
                            <div class="flex">
                                <label class="font-bold">Plot:&nbsp</label>
                                <div>${e.plot}</div>
                            </div>
                            <div class="flex">
                                <label class="font-bold">Genre:&nbsp</label>
                                <div>${e.genres && e.genres.join(',')}</div>
                            </div>
                            <div class="flex">
                                <label class="font-bold">Year:&nbsp</label>
                                <div>${e.year}</div>
                            </div>
                            <div class="flex">
                                <label class="font-bold">IMDB rating:&nbsp</label>
                                <div>${e.imdb.rating}</div>
                            </div>
                            <div class="flex">
                                <label class="font-bold">Score:&nbsp</label>
                                <div>${e.score ? e.score : 'N/A'}</div>
                            </div>
                        </div>
                        <div class="flex">
                            <img src=${e.poster?e.poster:'../static/poster-holder.jpeg'} class="w-40 h-50" />
                        </div>

                    </div>`

            });
            if (!output) {
                output = `<div class="flex justify-center">
                    No results to show
                </div>`
            }
            document.getElementById('data').classList.remove("hidden")
            document.getElementById('data').classList.add("flex")
            document.getElementById("data").innerHTML = output;
        }
    }
    catch (error) {
        console.error(`Could not complete the request: ${error}`);
    }
}

function clearPage() {
    document.getElementById('data').classList.remove("flex")
    document.getElementById('data').classList.add("hidden")
    document.getElementById('data').innerHTML = ''
}

function getCheckedRadioButtonLabelValue() {
    const radioElements = document.getElementsByName("feature-selection");
    for (elem of radioElements) {
        if (elem.checked) {
            return elem.labels[0].innerHTML
        }
    }
}