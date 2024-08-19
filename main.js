/* abre e fecha o menu quando clicar no ícone: hamburguer e X */

const nav = document.querySelector('#header nav')

const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, esconder o menu */

const links = document.querySelectorAll('nav ul li a')

for (const element of links) {
  element.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* fazer sombra no header da página quando der scroll */

const header = document.querySelector('#header')

const navHeight = header.offsetHeight

function shadowHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // scroll é menor que a altura do header
    header.classList.remove('scroll')
  }
}
// O EVENT LISTENER DESSA FUNÇÃO FOI MOVIDO PRO FINAL DO DOCUMENTO, PARA CHAMAR MAIS DE UMA FUNÇÃO DE UMA VEZ //

/* TESTIMONIALS CAROUSEL SLIDER SWIPER */

// const swiper = new Swiper('.swiper-container', {
//   slidesPerView: 1, //quantos slides por vez
//   pagination: {
//     el: '.swiper-pagination' // adiciona paginação
//   },
//   keyboard: true, // habilita setas do teclado

//   /* o Swiper vem com função de breakpoints inclusa, conforme documentação */

//   breakpoints: {
//     /* aqui ele entende o valor como "maior ou igual". no caso, maior ou igual a 767 pixels */
//     992: {
//       slidesPerView: 2 /* quantos slides de uma vez */,
//       setWrapperSize: true /* habilita aparecimento de mais um, dando size ao wrapper configurado segundo a documentação */
//     }
//   }
// })

/* SCROLL REVEAL - MOSTRAR ELEMENTOS QUANDO DER SCROLL NA PÁGINA */

const scrollReveal = ScrollReveal({
  origin: 'top', // onde começa
  distance: '30px', // distância da qual a caixa começa acima. começa 30 pixels acima e desce
  duration: 700, // duração em milisegundos (ms)
  reset: true // ao chegar no final da página ou subir, reseta, ou seja, deixa a animação acontecer sempre
})

scrollReveal.reveal(
  `
  #home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #contact .text, #contact .links
  #onde-estamos header, #onde-estamos .map,
  footer, footer .brand, footer .social
  `,
  { interval: 100 }
) // usa crase para abrir e fechar pois aí pode dar enter.
// faz um objeto aparecer após o outro, com intervalo de 100ms

/* BACK TO TOP BUTTON, faz ele aparecer só quando descer um pouco com scroll */

const backToTopButton = document.querySelector('.back-to-top')

function backToTopShow() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}
// o event listener dessa função eu coloquei junto com o da função shadowHeaderWhenScroll, abaixo

/* Menu ativo conforme a seção visível na página */

const sections = document.querySelectorAll('main section[id]')

function highlightMenuCurrentSection() {
  const checkpoint = window.pageYOffset + window.innerHeight / 2
  /* soma o deslocamento no eixo Y da janela metade da altura da janela */
  /* deixando mais claro: ele considera o quanto ja descemos da janela e encontra o meio da nossa visualização */

  for (const section of sections) {
    const sectionTop = section.offsetTop
    /* pega o (altura do) topo/inicio da section (o limite superior) */

    const sectionHeight = section.offsetHeight
    /* pega a altura da section */

    const sectionId = section.getAttribute('id')
    /*pega o id da section */

    const checkpointStart = checkpoint >= sectionTop
    /* o checkpoint start recebe o checkpoint DESDE QUE o checkpoint seja maior ou igual ao topo/início da section */
    /* funciona como boolean. ou seja, se a condição for atingida, ele recebe um valor (true), se não, 0 (false) */

    const checkpointEnd = checkpoint <= sectionTop + sectionHeight
    /* o checkpoint end recebe o checkpoint DESDE QUE o checkpoint seja menor ou igual à soma do (altura do) início da section com sua altura, ou seja, desde que o checkpoint esteja fora da section */
    /* funciona como boolean. ou seja, se a condição for atingida, ele recebe um valor (true), se não, 0(false) */

    if (checkpointStart && checkpointEnd) {
      /* se ambas forem verdadeiras, ou seja, se ambos receberem valores, OU SEJA, nessa lógica, se o valor de checkpoint estiver entre o início e o fim da seção */
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
      /* se o if for verdadeiro, pega todos os links (tag a) dentro de nav ul li cujo href CONTENHA a id da seção (definida na const sectionId) e adiciona uma classe 'active' neles */
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
      /* se o if não for verdadeiro, pega todos os links (tag a) dentro de nav ul li cujo href CONTENHA a id da seção (definida na const sectionId) e remove uma classe 'active' neles */
    }
  }
} /* ativo a função no evento do scroll, ali embaixo */

/* When scroll (sombra no header e também o botão de voltar ao topo, além do highlight no menu) */
window.addEventListener('scroll', function () {
  shadowHeaderWhenScroll()
  backToTopShow()
  highlightMenuCurrentSection()
  backToTopChangeColor()
})

/* CHANGE BACK-TO-TOP COLOR IF ON FOOTER */

// fazendo o botão de back-to-top mudar de cor ao chegar no footer

function backToTopChangeColor() {
  const footer = document.querySelector('footer')
  //seleciona o footer

  const footerHeight = footer.offsetTop
  // pega a altura do topo do footer

  const BackToTopButtonHeight = backToTopButton.offsetHeight

  const scrolledToFooter =
    window.pageYOffset + window.innerHeight >=
    footerHeight + BackToTopButtonHeight - BackToTopButtonHeight / 4
  /* define uma constante pra quando a altura scrollada (contando do topo) somada à altura da janela passar da altura do topo do footer somada à altura do topo do botão back-to-top. */
  // ou seja, quando você já estiver vendo o footer e o topo do botão back-to-top tiver passado o topo do footer, scrolledToFooter se torna truthy

  if (scrolledToFooter) {
    backToTopButton.classList.add('bottom')
  }

  const scrolledBack =
    window.pageYOffset + window.innerHeight <=
    footerHeight + BackToTopButtonHeight - BackToTopButtonHeight / 3

  if (scrolledBack) {
    backToTopButton.classList.remove('bottom')
  }
}
