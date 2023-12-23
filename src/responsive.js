
const header_title = document.querySelector('header .header-title');
const navbar_menu = document.querySelector('header nav .menu');
const navbar_icon = document.querySelector('header nav .sidebar.icon');
const color_theme_switcher = document.querySelector('.color-theme-switcher.mobile');
const color_theme_switcher_icon = document.querySelector('.color-theme-switcher.mobile i');
const color_theme_switcher_icon_bis = document.querySelector('.color-theme-switcher.desktop i');

const responsive = () => {
    if(window.innerWidth > 1000) {
        navbar_menu.style.display = 'flex';
        navbar_icon.style.display = 'none';
        color_theme_switcher.style.display = 'none';
    }
    
    if(window.innerWidth < 1000) {
        navbar_menu.style.display = 'none';
        navbar_icon.style.display = 'flex';
        navbar_icon.style.fontSize = '2.2rem';
        
        $('.ui.dropdown.navbar')
            .dropdown();

        color_theme_switcher.style = `
            font-size: 1.5rem;
            position: relative;
            bottom: 3px;
            left: -5px;
        `;
    }


    // Vérifiez si l'utilisateur est sur iOS
    // var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // if (isIOS) {
    //     document.querySelectorAll('footer form input').forEach((input) => input.style.marginBottom = '0.88rem');
    // } 

}

window.addEventListener('load', responsive);
window.addEventListener('resize', responsive);
window.addEventListener('scroll', responsive);


const toggle_theme = (th) => {
    if(th == 'dark') {
        document.body.classList.remove('light');
        document.getElementById('color_theme_switcher').classList.add('dark');
        document.getElementById('color_theme_switcher').classList.remove('light');
        document.querySelector('.color-theme-switcher.desktop a').textContent = 'Sombre';
        color_theme_switcher_icon.classList.replace('sun', 'moon');
        color_theme_switcher_icon_bis.classList.replace('sun', 'moon');
        localStorage.setItem('current_theme', 'dark');
    } else if(th == 'light') {
        document.body.classList.add('light');
        document.getElementById('color_theme_switcher').classList.remove('dark');
        document.getElementById('color_theme_switcher').classList.add('light');
        document.querySelector('.color-theme-switcher.desktop a').textContent = 'Clair';
        color_theme_switcher_icon.classList.replace('moon', 'sun');
        color_theme_switcher_icon_bis.classList.replace('moon', 'sun');
        localStorage.setItem('current_theme', 'light');
    } else {
        if(localStorage.getItem('current_theme') == 'light') {
            toggle_theme('light');
        } else if(localStorage.getItem('current_theme') == 'dark') {
            toggle_theme('dark');
        } else {
            if(document.body.classList.contains('light')) {
                localStorage.setItem('current_theme', 'light');
            } else {
                localStorage.setItem('current_theme', 'dark');
            }
        }
    }
}

const change_theme = () => {
    if(document.getElementById('color_theme_switcher').classList.contains('light'))
        toggle_theme('dark');
    else 
        toggle_theme('light');
}

toggle_theme('');


function animated(e) {
    e.target.querySelectorAll('.animate-on-hover').forEach(element => {
        element.classList.add('animated');
    });
    e.target.onmouseleave = () => {
        e.target.querySelectorAll('.animate-on-hover').forEach(element => {
            element.classList.remove('animated');
        });
    }
}