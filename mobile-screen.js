// Reference link: https://youtu.be/bHRXRYTppHM

class MobileNavbar{
  constructor(mobileMenu, navList, navLinks){
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  };

  hiddenName(){
    // Hidden my name when click mobile menu, for not appear in top
    document.querySelector(".mobile-menu").addEventListener("click", function(){
      if(document.querySelector(".myname").style.visibility == "hidden"){
        document.querySelector(".myname").style.visibility = "visible";
        return;
      }
      document.querySelector(".myname").style.visibility = "hidden";
    })
  }

  animateLinks(){
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 20 + 0.09}s`);
    });
  }

  handleClick(){
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
    document.querySelector("#wrapperJS").style = ""
  }

  addClickEvent(){
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init(){
    this.hiddenName();
    if(this.mobileMenu){
      this.addClickEvent();
    };
    return this;
  };
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
)
mobileNavbar.init()
