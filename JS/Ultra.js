

async function toggleDropdown() {
    var element = document.getElementById("navDropdown");

    if (element) {//unknown if this is necessary but stack overflow has it like this
        var display = element.style.display;

        if (display == "none") {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    }
}

async function challengeData() { //This is fully AI and I have no clue what is going on
    const baseURL = "https://btd6index.win";

    // randomly choose endpoint
    const randomNum = Math.random();
    const endpoint = randomNum < 0.5 ? "fetch-2tc" : "fetch-2mp"; //Like what the hell does this even mean

    const params = new URLSearchParams({
        query: "Ultra-Juggernaut",
        count: 100
    });

    const url = `${baseURL}/${endpoint}?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    if (!data.results || data.results.length === 0) {
        throw new Error("No Ultra-Juggernaut completions found");
    }

    // pick a random completion
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const completion = data.results[randomIndex];

    // extract needed fields
    const map = completion.map;
    const filekey = completion.filekey;

    if (completion.link != null) {
        challengeData();
        return null;
    }
    // build link if needed
    const link = completion.link ?? `https://media.btd6index.win/${filekey}`;
    const challengeType = randomNum < 0.5 ? "2TC!" : "2MPC!";
    var t = `${map} ${challengeType}`;
    
    document.getElementById("challengeImage 1").src = link;
    document.getElementById("challengeText 1").innerText = t;
    document.getElementById("panelFirst").display = "block";
    
    setTimeout(challengeData, 10000)
    return {
        map,
        filekey,
        link
    };

}
