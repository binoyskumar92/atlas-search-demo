async function sample() {
    try {
        const response = await fetch('http://localhost:6767')
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        data.map(e=>console.log(e))
        
    }
    catch (error) {
        console.error(`Could not complete the request: ${error}`);
    }
}