const places = [{ "id": 1, "name": "Parque da Cidade", "latitude": "-23.221112", "longitude": "-45.899678" },
{ "id": 2, "name": "Parque Ulisses Guimarães", "latitude": "-23.180038", "longitude": "-45.884357" }]
export function placesV2() {
    res.status(200).json(places);
}

export function specificPlaceV2(req,res) {
    let index = searchPlace(req.params.id)
    res.json(places[index]);
}

function searchPlace(id) {
    return places.findIndex(places => places.id == id);
}