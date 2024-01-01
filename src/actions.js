document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelector('.button-show-portfolio').onclick = () => {
        location.replace('#portfolio');
    }
    document.querySelector('.button-show-services').onclick = () => {
        location.replace('#services');
    }

    $('#lang').dropdown();
    const lang_label = document.querySelectorAll('#lang span');

    document.querySelector('#lang_FR').onclick = () => {
        lang_label.forEach(lb => lb.textContent = 'FR');
    }
    document.querySelector('#lang_EN').onclick = () => {
        lang_label.forEach(lb => lb.textContent = 'EN');
    }
    document.querySelector('#lang_LI').onclick = () => {
        lang_label.forEach(lb => lb.textContent = 'LI');
    }


    const modal_member = document.getElementById('modal_member');

    document.querySelectorAll('.dev').forEach((dev) => {
        dev.onclick = () => {
            fetch('data/members.jsonc')
                .then(response => response.json())
                .then(data => {
                    const c_dev = data.filter((dev_) => dev_.id == dev.id)[0];

                    if(c_dev) {
                        // console.log(c_dev)

                        modal_member.innerHTML = `
                        <div class="topbar">
                            <div class="photo"></div>
                            <div class="info">
                                <div class="name">${c_dev.name}</div>
                                <div class="skill">${c_dev.skill}</div>
                            </div>
                        </div>

                        <div class="ui divider"></div>

                        <div class="downbar">
                            <div class="leftside">
                                <span class="title">Compétances</span>
                            </div>

                            <div class="rightside">
                                <div class="about">
                                    <span class="title">A propos</span>
                                    <p class="content">${c_dev.about}</p>
                                </div>
                                
                                <div class="ui divider"></div>

                                <div class="spoken-languages">
                                    <span class="title">Langues parlées</span>
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <i id="portfolio_modal_close" class="close icon"></i>
                        `;

                        modal_member.querySelector('.topbar .photo').style = `
                            background: url(${c_dev.photo});
                            background-size: cover;
                            background-position: 0%;
                        `;

                        c_dev.skills.spoken_languages.forEach((lang) => {
                            modal_member.querySelector('.rightside .spoken-languages ul').innerHTML += `<li class="language">${lang}</li>`;
                        })
                    } else {
                        console.log("user not found");
                    }
                })

            $('#modal_member')
                .modal('show')
                .modal('attach events', '.close-modal', 'hide');
        }
    })
})