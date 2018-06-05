$(document).ready(function () {

    class Damier{
        constructor(width, height){
        }
    };
    let joueur = true;
    let tour = $('<div/>');
    $('body').append(tour);
    let ligneHorizontal = function(tab, nombre){
        for(let y = 0; y < tab.length; ++y){
            for(let x = 0; x < tab[y].length; ++x){
                let cell = tab[y][x];
                // alert(cell);
                let ok = true;
                if(cell === null)
                    continue;
                for (let i = 1; i < nombre; ++i){
                    if (tab[y][x+i] !== cell) {
                        // console.log(tab[y][x+i]);
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    return true;
                }
            }
        }
        return false;
    };
    let ligneVertical = function(tab, nombre){
        for(let y = 0; y < tab.length; ++y){
            for(let x = 0; x < tab[y].length; ++x){
                let cell = tab[x][y];
                let ok = true;
                if(cell === null)
                    continue;
                for (let i = 1; i < nombre; ++i) {
                    try {
                        if (tab[x + i][y] !== cell) {
                            // console.log(tab[x][y + i]);
                            ok = false;
                            break;
                        }
                    } catch(err){
                        ok = false;
                        break;
                    }

                }
                if (ok) {
                    return true;
                }
            }
        }
        return false;
    };

    let ligneDiagonal = function (tab, nombre) {
        for(let y = 0; y < tab.length - (nombre-1)  ; ++y){
            for(let x = 0; x < tab[y].length; ++x){
                let cell = tab[y][x];
                let ok = true;
                if(cell === null)
                    continue;
                for (let i = 1; i < nombre; ++i) {
                    try {
                        if (tab[y+i][x+i] !== cell) {
                            console.log(tab[x][y + i]);
                            ok = false;
                            break;
                        }
                        if (tab[y-i][x-i] !== cell) {
                            console.log(tab[x][y + i]);
                            ok = false;
                            break;
                        }
                    } catch(err){
                        ok = false;
                        break;
                    }

                }
                if (ok) {
                    return true;
                }
                for (let i = 1; i < nombre; ++i) {
                    try {
                        if (tab[(y+1)-i][(x+1)-i] !== cell) {
                            // console.log(tab[x][y + i]);
                            ok = false;
                            break;
                        }
                    } catch(err){
                        ok = false;
                        break;
                    }

                }
                if (ok) {
                    return true;
                }
            }
        }
        return false;
    };
    let creer_table = function (width, height) {

        let obj = $('<table/>');
        let tab = new Array();
        for (let y = 0; y < height; y++) {
            // let firstColor = color;
            let tr = $('<div/>');
            tr.css({
                'display': 'inline-block',
                'width': '100%',
                'padding': 'top'
            });
            tab.push(new Array());
            let estNoir = y % 2 === 0;
            for (let x = 0; x < width; x++) {
                tab[y].push(null);
                let td = $('<div/>');
                td.css({
                    'display': 'inline-block',
                    'margin': '0',
                    'padding': 'top',
                    'width': '30px',
                    'height': '30px',
                    'float': 'left',
                    'text-align': 'center',
                    'background-color': estNoir ? 'black' : 'white',
                    'color': estNoir ? 'white' : 'black'
                });
                td.data('x', x);
                td.data('y', y);
                td.click(function () {
                    if(tab[y][x] == null){
                        $(this).append(getPionJoueur());
                        tab[y][x] = getPionJoueur();
                        if(ligneHorizontal(tab,3) || ligneVertical(tab, 3)|| ligneDiagonal(tab, 3)){
                            alert("Winner is : " + getPionJoueur());
                        }
                        changeJoueur();
                        majJoueur();

                    }
                });
                tr.append(td);
                estNoir = !estNoir;
            }
            obj.append(tr);
            $('body').append(obj);
        }
        majJoueur();
        return obj;
    };

    let majJoueur = function(){
        if (joueur)
            j = "1";
        else
            j = "2";
        tour.html("Au tour du joueur " + j);

    };

    let getJoueur = function(){
        return joueur;
    };

    let getPionJoueur = function () {
        if (getJoueur())
            return 'X';
        else
            return 'O';
    };

    let changeJoueur = function(){
        joueur = !joueur;
    };

    $('body').append(
        creer_table(3, 3),
    );

});