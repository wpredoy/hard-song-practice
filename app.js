const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result")

const apiURL = "https://api.lyrics.ovh";

form.addEventListener("submit",submitForm =>{
	submitForm.preventDefault();
	const searchTeam = search.value;
	if(!searchTeam) {
		alert("Please type is search term")
	}
	else{
		searchSong(searchTeam)
	}
	
});

function searchSong(song){
	fetch(`${apiURL}/suggest/${song}`)
	.then(res=> res.json())
	.then(data => {
		const dataForm = data.data;
		let output = '';
		for(let i=0; i<10; i++) {
			const outputForm = dataForm[i];
			const title = dataForm[i].title;
			const artist = dataForm[i].artist.name;
			const artistSong = dataForm[i].preview;
			const picture = dataForm[i].artist.picture;
			
			
			
		output +=`
					<li>
						<span><strong>${title}</strong> - <br> ${artist}</span>
                        <button class="btnClass" data-artist ="${artist}"data-songTitle = "${title}">Get Lyrics</button>
					</li>
				`;
		}
		
		result.innerHTML = `
								<ul class="songs">
									${output}
								</ul>
							`;
	});
}

result.addEventListener("click", clicked => {
		const clickedElement = clicked.target;
		if(clickedElement.tagName === "BUTTON") {
			const artist = clickedElement.getAttribute("data-artist");
			const songTitle = clickedElement.getAttribute("data-songTitle")
			
			getLyrics(artist, songTitle)
		}
});

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data= await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result2.innerHTML = `<h2><strong>${songTitle}</strong> - ${artist}</h2>
    <hr>
    <p>${lyrics}</p>
    `;

    
}


















