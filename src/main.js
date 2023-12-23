/* 
function colorTrace(color = "white", background = 'transparent') {
    return "color:" + color + ";font-weight:normal;background:" + background + ";border-radius: 9px;";
}

function print(msg, color = "white", background = 'transparent') {
    console.log("%c" + msg, colorTrace(color, background));
}


print(' Error ', "yellow", "red")
print(" Cet utilisateur n'existe pas ", 'white', 'purple')
*/


// 
// Portfolio slider animation
// ----
// 
const OUR_PORTFOLIO = [
//     {
//         id: 'portfolio_01',
//         img_link: '../assets/images/portfolio/portfolio_img_01.jpg',
//         title: 'amogoe',
//         desc: 'A responsive web site for amogoe'
//     },
//     {
//         id: 'portfolio_02',
//         img_link: '../assets/images/portfolio/portfolio_img_02.jpg',
//         title: 'E Book Mobile App',
//         desc: 'A responsive web app for ebook'
//     },
    {
        id: 'portfolio_03',
        img_link: 'assets/images/portfolio/portfolio_img_03.jpg',
        title: 'Jaison',
        desc: 'A Graphic Designer'
    },
    {
        id: 'portfolio_04',
        img_link: 'assets/images/portfolio/portfolio_img_04.jpg',
        title: 'Daniel Stephan',
        desc: 'A web frontend developer'
    },
    {
        id: 'portfolio_05',
        img_link: 'assets/images/portfolio/portfolio_img_05.jpg',
        title: 'Jason Martin',
        desc: 'A Graphic Designer'
    },
    {
        id: 'portfolio_06',
        img_link: 'assets/images/portfolio/portfolio_img_06.jpg',
        title: 'Web Design',
        desc: 'Not powered by Lupita Tech'
    },
    {
        id: 'portfolio_07',
        img_link: 'assets/images/portfolio/portfolio_img_07.jpg',
        title: 'Web Design',
        desc: 'Not powered by Lupita Tech'
    },
    {
        id: 'portfolio_08',
        img_link: 'assets/images/portfolio/portfolio_img_08.jpg',
        title: 'Web Design',
        desc: 'Not powered by Lupita Tech'
    },
    {
        id: 'portfolio_09',
        img_link: 'assets/images/portfolio/portfolio_img_09.jpg',
        title: 'Web Design',
        desc: 'Not powered by Lupita Tech'
    },
    {
        id: 'portfolio_10',
        img_link: 'assets/images/portfolio/portfolio_img_10.jpg',
        title: 'Web Design',
        desc: 'Not powered by Lupita Tech'
    },
    {
        id: 'portfolio_11',
        img_link: 'assets/images/portfolio/portfolio_img_11.jpg',
        title: 'Web Design',
        desc: 'Not powered by Lupita Tech'
    },
    {
        id: 'portfolio_12',
        img_link: 'assets/images/portfolio/portfolio_img_12.jpg',
        title: 'Web Design',
        desc: 'Not powered by Lupita Tech'
    }
    // {
    //     id: 'portfolio_13',
    //     img_link: 'assets/images/portfolio/portfolio_img_13.jpg',
    //     title: 'Web Design',
    //     desc: 'Not powered by Lupita Tech'
    // },
    // {
    //     id: 'portfolio_14',
    //     img_link: '../assets/images/portfolio/portfolio_img_14.jpg',
    //     title: 'Web Design',
    //     desc: 'Not powered by Lupita Tech'
    // },
    // {
    //     id: 'portfolio_15',
    //     img_link: '../assets/images/portfolio/portfolio_img_15.jpg',
    //     title: 'Web Design',
    //     desc: 'Not powered by Lupita Tech'
    // },
    // {
    //     id: 'portfolio_16',
    //     img_link: '../assets/images/portfolio/portfolio_img_16.jpg',
    //     title: 'Web Design',
    //     desc: 'Not powered by Lupita Tech'
    // },
    // {
    //     id: 'portfolio_17',
    //     img_link: '../assets/images/portfolio/portfolio_img_17.jpg',
    //     title: 'Web Design',
    //     desc: 'Not powered by Lupita Tech'
    // },
];

const posters = document.querySelectorAll('#home .portfolio-slider .poster');
const posters_indicators = document.querySelector('#home .portfolio-slider .poster svg.circle-indicators');
let it = 0, current_image_id = 0, timging = 8000;

// Valeurs d'attributs initial du slider
posters_indicators.setAttribute('width', `${21*OUR_PORTFOLIO.length}`);
posters_indicators.setAttribute('viewBox', `0 0 ${21*OUR_PORTFOLIO.length} 14`);
OUR_PORTFOLIO.forEach((current)=>{
    posters_indicators.innerHTML += `<circle id="${current.id}" cx="${7 + (it*12)}" cy="7" r="3.5" fill="#D9D9D9" fill-opacity="0.5" title="${current.title}"/>`;
    it++;
})

// fonction pour le switch d'image du slider d'image
function set_image(img_id) {
    // configuration precedentes et suivante
    document.getElementById(OUR_PORTFOLIO[(img_id-1 < 0 ? OUR_PORTFOLIO.length-1 : img_id-1)].id).setAttribute('fill-opacity', "0.5");
    document.getElementById(OUR_PORTFOLIO[(img_id-1 < 0 ? OUR_PORTFOLIO.length-1 : img_id-1)].id).setAttribute('fill', "#D9D9D9");
    document.getElementById(OUR_PORTFOLIO[(img_id+1 > OUR_PORTFOLIO.length-1 ? 0 : img_id+1)].id).setAttribute('fill-opacity', "0.5");
    document.getElementById(OUR_PORTFOLIO[(img_id+1 > OUR_PORTFOLIO.length-1 ? 0 : img_id+1)].id).setAttribute('fill', "#D9D9D9");

    // configuration actuelle
    document.getElementById(OUR_PORTFOLIO[img_id].id).setAttribute('fill-opacity', "1");
    document.getElementById(OUR_PORTFOLIO[img_id].id).setAttribute('fill', "#3ad65c");

    // definition de l'image
    for(poster of posters) {
        poster.style = `
        background: url(${OUR_PORTFOLIO[img_id].img_link});
        background-repeat: no-repeat;
        background-size: cover;
        will-change: transform;
        `;
        document.querySelector('#home .portfolio-slider .top-poster .elements .image-meta .label').innerHTML = `<span>${OUR_PORTFOLIO[img_id].title}</span> <br>${OUR_PORTFOLIO[img_id].desc}`;
    }
}

function slide_anim() {
    set_image(current_image_id);

    // switch
    setTimeout(() => {
        current_image_id++;
        if(current_image_id >= OUR_PORTFOLIO.length)
            current_image_id = 0;
        slide_anim(current_image_id);
    }, timging);
}

// button pour changer d'image
const left_arrow = document.querySelector('#home .portfolio-slider .poster .arrows .left-arrow');
const right_arrow = document.querySelector('#home .portfolio-slider .poster .arrows .right-arrow');

right_arrow.onclick = () => {
    if(current_image_id < OUR_PORTFOLIO.length-1)
        current_image_id++;
    else
        current_image_id = 0;

    set_image(current_image_id);
}

left_arrow.onclick = () => {
    if(current_image_id > 0)
        current_image_id--;
    else
        current_image_id = OUR_PORTFOLIO.length-1;

    set_image(current_image_id);
}

// lancement du slider
slide_anim();


// affiche les elements a l'ecran lorsque qu'ils sont visible a l'ecran
// avec un effet de fade-in
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                //   observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('animated');
            }
        });
    }, { threshold: 0.5 });
  
    elements.forEach(element => {
        observer.observe(element);
    });
});






// PARALLAX EEFECT
// const layers = posters;

// window.addEventListener('scroll', function () {
//     const scrollY = window.scrollY;

//     layers.forEach(function (layer, index) {
//         const speed = 0.5 * (index + 1);
//         const yPos = -(scrollY * speed);
//         layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
//     });
// });


// On typing animation
// const textElement = document.querySelector('#home .developers-list h1');
// const cursorElement = document.getElementById('cursor');

// // Initial hide of the cursor
// cursorElement.style.display = 'none';

// // Show the cursor after text is fully typed
// textElement.addEventListener('animationiteration', function () {
//     cursorElement.style.display = 'none';
//     setTimeout(function () {
//         cursorElement.style.display = 'inline-block';
//     }, 500);
// });
