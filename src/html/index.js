async function search() {
    try {
        const response = await fetch('http://localhost:6767')
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        let output = '';
        data.forEach(e => {
            output +=
`                <div class="flex flex-col border p-2 m-1 rounded-md bg-[#ebf3d8]">
                    <div class="flex">
                        <label class="font-bold">Movie name:&nbsp</label>
                        <div>${e.title}</div>
                    </div>
                    <div class="flex">
                        <label class="font-bold">Plot:&nbsp</label>
                        <div>${e.plot}</div>
                    </div>

                </div>`

        });

        document.getElementById('data').classList.remove("hidden")
        document.getElementById('data').classList.add("flex")
        document.getElementById("data").innerHTML = output;

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