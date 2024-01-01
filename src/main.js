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
// const OUR_PORTFOLIO = [
// //     {
// //         id: 'portfolio_01',
// //         img_link: '../assets/images/portfolio/portfolio_img_01.jpg',
// //         title: 'amogoe',
// //         desc: 'A responsive web site for amogoe'
// //     },
// //     {
// //         id: 'portfolio_02',
// //         img_link: '../assets/images/portfolio/portfolio_img_02.jpg',
// //         title: 'E Book Mobile App',
// //         desc: 'A responsive web app for ebook'
// //     },
//     {
//         id: 'portfolio_03',
//         img_link: '../assets/images/portfolio/portfolio_img_03.jpg',
//         title: 'Jaison',
//         desc: 'A Graphic Designer'
//     },
//     {
//         id: 'portfolio_04',
//         img_link: '../assets/images/portfolio/portfolio_img_04.jpg',
//         title: 'Daniel Stephan',
//         desc: 'A web frontend developer'
//     },
//     {
//         id: 'portfolio_05',
//         img_link: '../assets/images/portfolio/portfolio_img_05.jpg',
//         title: 'Jason Martin',
//         desc: 'A Graphic Designer'
//     },
//     {
//         id: 'portfolio_06',
//         img_link: '../assets/images/portfolio/portfolio_img_06.jpg',
//         title: 'Web Design',
//         desc: 'Not powered by Lupita Tech'
//     },
//     {
//         id: 'portfolio_07',
//         img_link: '../assets/images/portfolio/portfolio_img_07.jpg',
//         title: 'Web Design',
//         desc: 'Not powered by Lupita Tech'
//     },
//     {
//         id: 'portfolio_08',
//         img_link: '../assets/images/portfolio/portfolio_img_08.jpg',
//         title: 'Web Design',
//         desc: 'Not powered by Lupita Tech'
//     },
//     {
//         id: 'portfolio_09',
//         img_link: '../assets/images/portfolio/portfolio_img_09.jpg',
//         title: 'Web Design',
//         desc: 'Not powered by Lupita Tech'
//     },
//     {
//         id: 'portfolio_10',
//         img_link: '../assets/images/portfolio/portfolio_img_10.jpg',
//         title: 'Web Design',
//         desc: 'Not powered by Lupita Tech'
//     },
//     {
//         id: 'portfolio_11',
//         img_link: '../assets/images/portfolio/portfolio_img_11.jpg',
//         title: 'Web Design',
//         desc: 'Not powered by Lupita Tech'
//     },
//     {
//         id: 'portfolio_12',
//         img_link: '../assets/images/portfolio/portfolio_img_12.jpg',
//         title: 'Web Design',
//         desc: 'Not powered by Lupita Tech'
//     }
//     // {
//     //     id: 'portfolio_13',
//     //     img_link: '../assets/images/portfolio/portfolio_img_13.jpg',
//     //     title: 'Web Design',
//     //     desc: 'Not powered by Lupita Tech'
//     // },
//     // {
//     //     id: 'portfolio_14',
//     //     img_link: '../assets/images/portfolio/portfolio_img_14.jpg',
//     //     title: 'Web Design',
//     //     desc: 'Not powered by Lupita Tech'
//     // },
//     // {
//     //     id: 'portfolio_15',
//     //     img_link: '../assets/images/portfolio/portfolio_img_15.jpg',
//     //     title: 'Web Design',
//     //     desc: 'Not powered by Lupita Tech'
//     // },
//     // {
//     //     id: 'portfolio_16',
//     //     img_link: '../assets/images/portfolio/portfolio_img_16.jpg',
//     //     title: 'Web Design',
//     //     desc: 'Not powered by Lupita Tech'
//     // },
//     // {
//     //     id: 'portfolio_17',
//     //     img_link: '../assets/images/portfolio/portfolio_img_17.jpg',
//     //     title: 'Web Design',
//     //     desc: 'Not powered by Lupita Tech'
//     // },
// ];


document.addEventListener('DOMContentLoaded', ()=> {
    const posters = document.querySelectorAll('#home .portfolio-slider .poster');
    const posters_indicators = document.querySelector('#home .portfolio-slider .poster svg.circle-indicators');
    const portfolio_images = document.querySelector('#portfolio .portfolio-images');
    let it = 0, current_image_id = 0, timging = 10000;

    fetch('../data/portfolio.json')
        .then(res => res.json())
        .then(data => {
            const OUR_PORTFOLIO = data;
            const MAX_POSTER = (OUR_PORTFOLIO.length >= 6 ? 6 : OUR_PORTFOLIO.length);

            OUR_PORTFOLIO.forEach(img => {
                portfolio_images.innerHTML += `
                <style>
                    #${img.id}:not(span) {
                        background: url(${img.images[0].url});
                        background-size: cover;
                    }
                </style>
                <div id="${img.id}" class="portfolio-image object-to-hover" onmouseenter="animated(event)">
                    <div class="see-more animate-on-hover">
                        <span id="${img.id}" class="examine-portofolio-button">Plus d'infos</span>
                    </div>
                </div>
                `;
            })

            // Valeurs d'attributs initial du slider
            it = 0;
            posters_indicators.setAttribute('width', `${21*MAX_POSTER}`);
            posters_indicators.setAttribute('viewBox', `0 0 ${21*MAX_POSTER} 14`);
            for(current of OUR_PORTFOLIO) {
                if(it >= MAX_POSTER) break;
                posters_indicators.innerHTML += `<circle id="${current.id}" cx="${7 + (it*12)}" cy="7" r="3.5" fill="#D9D9D9" fill-opacity="0.5" title="${current.title}"/>`;
                it++;
            }
            
            // fonction pour le switch d'image du slider d'image
            function set_image(img_id) {
                // configuration precedentes et suivante
                document.getElementById(OUR_PORTFOLIO[(img_id-1 < 0 ? MAX_POSTER-1 : img_id-1)].id).setAttribute('fill-opacity', "0.5");
                document.getElementById(OUR_PORTFOLIO[(img_id-1 < 0 ? MAX_POSTER-1 : img_id-1)].id).setAttribute('fill', "#D9D9D9");
                document.getElementById(OUR_PORTFOLIO[(img_id+1 > MAX_POSTER-1 ? 0 : img_id+1)].id).setAttribute('fill-opacity', "0.5");
                document.getElementById(OUR_PORTFOLIO[(img_id+1 > MAX_POSTER-1 ? 0 : img_id+1)].id).setAttribute('fill', "#D9D9D9");
            
                // configuration actuelle
                document.getElementById(OUR_PORTFOLIO[img_id].id).setAttribute('fill-opacity', "1");
                document.getElementById(OUR_PORTFOLIO[img_id].id).setAttribute('fill', "#3ad65c");
            
                // definition de l'image
                for(poster of posters) {
                    poster.style = `
                    background: url(${OUR_PORTFOLIO[img_id].images[0].url});
                    background-repeat: no-repeat;
                    background-size: cover;
                    will-change: transform;
                    `;
                    document.querySelector('#home .portfolio-slider .top-poster .elements .image-meta .label').innerHTML = `<span>${OUR_PORTFOLIO[img_id].title}</span> <br>${OUR_PORTFOLIO[img_id].about.resume}`;
                }
            }
            
            function slide_anim(mid = undefined) {
                if(mid) current_image_id = mid;
                set_image(current_image_id);
            
                // switch
                setTimeout(() => {
                    current_image_id++;
                    if(current_image_id >= MAX_POSTER)
                        current_image_id = 0;
                    slide_anim(current_image_id);
                }, timging);
            }
            
            // button pour changer d'image
            const left_arrow = document.querySelector('#home .portfolio-slider .poster .arrows .left-arrow');
            const right_arrow = document.querySelector('#home .portfolio-slider .poster .arrows .right-arrow');
            
            right_arrow.onclick = () => {
                if(current_image_id < MAX_POSTER-1)
                    current_image_id++;
                else
                    current_image_id = 0;
            
                set_image(current_image_id);
            }
            
            left_arrow.onclick = () => {
                if(current_image_id > 0)
                    current_image_id--;
                else
                    current_image_id = MAX_POSTER-1;
            
                set_image(current_image_id);
            }
            
            // lancement du slider
            slide_anim();



            const modal_portfolio = document.getElementById('modal_portfolio');

            document.querySelectorAll('.examine-portofolio-button').forEach((button) => {
                button.onclick = ()=> {
                    fetch('data/portfolio.json')
                        .then(response => response.json())
                        .then(data => {
                            const c_pf = data.filter((pf_) => pf_.id == button.id)[0];

                            if(c_pf) {
                                // console.log(c_pf)

                                modal_portfolio.innerHTML = `
                                

                                <div class="topbar">
                                    <div class="photo"></div>
                                    <div class="info">
                                        <div class="name">${c_pf.title}</div>
                                        <div class="skill">${c_pf.label}</div>
                                    </div>
                                </div>

                                <div class="ui divider"></div>

                                <div class="downbar">
                                    <div class="leftside">
                                        <span class="title">Images</span>
                                        <div class="images"></div>
                                    </div>

                                    <div class="rightside">
                                        <div class="about">
                                            <span class="title">A propos</span>
                                            <p class="content">${c_pf.about.full_resume}</p>
                                        </div>
                                        
                                        <div class="ui divider"></div>

                                        <div class="authors">
                                            <span class="title">Auteurs</span>
                                            <ul>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <i id="portfolio_modal_close" class="close icon"></i>
                                `;

                                modal_portfolio.querySelector('.topbar .photo').style = `
                                    background: url(${c_pf.icon_url});
                                    background-size: cover;
                                    background-position: 0%;
                                `;

                                fetch("data/members.jsonc")
                                    .then(ress => ress.json())
                                    .then(m_data => {
                                        let c_dev;
                                        c_pf.authors.forEach(author => {
                                            c_dev = m_data.filter((dev) => dev.id == author)[0];

                                            modal_portfolio.querySelector('.rightside .authors ul').innerHTML += `
                                            <li class="author div" id="${author}">
                                                <div class="photo"></div>
                                                <div class="info">
                                                    <div class="name">${c_dev.name}</div>
                                                    <div class="skill">${c_dev.skill}</div>
                                                </div>
                                            </li>
                                            `;

                                            modal_portfolio.querySelector('.rightside .authors ul #' + author + ' .photo').style = `
                                            background: url(${c_dev.photo});
                                            background-size: cover;
                                            background-position: 0%;
                                            `;
                                        })
                                    })

                                c_pf.images.forEach(img => {
                                    modal_portfolio.querySelector('.leftside .images').innerHTML += `<li class="image" id="${img.id}"></li>`;

                                            modal_portfolio.querySelector('.leftside #' + img.id + '.image').style = `
                                            background: url(${img.url});
                                            background-size: cover;
                                            background-position: ${img.backgroundPos};
                                            `;
                                })
                            } else {
                                console.log("user not found");
                            }
                        })

                    $('#modal_portfolio')
                        .modal('show');
                }
            })
        })
})


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
    
    const elements_ = document.querySelectorAll('.page-section');
    
    function select_menu_item(menu) {
        return document.getElementById(menu + '_menu');
    }
    
    const section_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                select_menu_item(entry.target.id).classList.add('active');
            }
            
            if(!entry.isIntersecting) {
                select_menu_item(entry.target.id).classList.remove('active');
            }
    
        });
    }, { threshold: 0.5 });
    
    elements_.forEach(element => {
        section_observer.observe(element);
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
