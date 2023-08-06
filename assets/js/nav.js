// const showSubmenu = () => {
//     if(document.getElementById("subMenuRedactar").style.display === 'none'){
//         document.getElementById("subMenuRedactar").style.display="block"
//     }else{
//         document.getElementById("subMenuRedactar").style.display="none"
//     }
// }
window.onload = () => {
    
    let listElements = document.querySelectorAll('.list-button-click');
    listElements.forEach(listElement => {   
        listElement.addEventListener("click", ()=>{
            listElement.classList.toggle('arrow');
            let height = 0;
            let menu = listElement.nextElementSibling;
            if(menu.clientHeight == "0"){
                height = menu.scrollHeight
            }
            menu.style.height = height+"px";
        })
    });

    const btn = document.querySelector('#tab-menu');
    const menu = document.querySelector('#side-menu');
    const form = document.querySelector('#form');

    btn.addEventListener('click', e => {
        menu.classList.toggle("menu-expanded");
        menu.classList.toggle("menu-collapsed");
    });
    
    function myFunction(x) {
        if (x.matches) { // If media query matches
            menu.classList.add('menu-collapsed');
            menu.classList.remove('menu-expanded');
        } else {
            menu.classList.remove('menu-collapsed');
            menu.classList.add('menu-expanded');
        }
    }
    
        var x = window.matchMedia("(max-width: 1600px)")
        myFunction(x) // Call listener function at run time
        x.addListener(myFunction) // Attach listener function on state changes
}

