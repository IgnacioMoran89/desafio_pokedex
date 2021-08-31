$(document).ready(function () {
    let endpoint = 'https://pokeapi.co/api/v2/pokemon/'

    //Evita comportamiento por defecto de botón de página siguiente
    $('#nextTo').click(function (e) {
        e.preventDefault();
        $(".card-pokemon").html(" ");
        fetchPokemon();
    })

    //function dataPokemon(page) {
        //console.log(page)
    //}

    fetchPokemon();

    //trae las card de index
    function fetchPokemon() {
        $.ajax({
            url: endpoint,
            method: 'GET',
            success: function (response) {
                endpoint = response.next;
                console.log(endpoint);
                response.results.forEach(function (pokemon) {
                    let list = `<div class='card'>
                    <div class='card-body'> 
                    <h5 id='pokename'class='card-title'>${pokemon.name}</h5>
                    <a href='#' url='${pokemon.url}' 
                    class='btn btn-primary'>Quién es ese Pokemón?</a> 
                    </div>
                    </div>`
                    $(".card-pokemon").append(list)
                })
            },
            //trae la estructura de modal 
            complete: function () {
                $('.btn-primary').click(
                    function (e) {
                        e.preventDefault();
                        $('#exampleModal').modal('show');
                        let data = ($(this).attr('url'));

                        //trae los atributos del pokemon
                        $.ajax({
                            url: data,
                            method: 'GET',
                            success: function (response) {
                                let name = response.name
                                let typ = response.types[0].type.name
                                let gen = response.sprites.front_shiny
                                let abi = ''
                                response.abilities.forEach(function (abilities) {
                                    abi = abi + ' ' + abilities.ability.name
                                })
                                let mov = ''
                                response.moves.forEach(function (moves, index) {
                                    if (index < 5) {
                                        mov = mov + ' ' + moves.move.name
                                    }
                                })

                                //Introduce al HTML
                                $('#exampleModalLabel').html(name)
                                $('#type').html(typ)
                                $('#abilities').html(abi)
                                $('#moves').html(mov)
                                $('#generation').html(` <img src="${gen}" alt="">`)

                            }
                        })
                    }
                )
            }

        });
    }





});