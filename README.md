## Angular View Styling With Bootstrap

### PART Style

> 1. Adding style in `style.scss`

Open `style.scss`

```scss
.footer-logo {
  height: 30px;
}

.bg-enigma {
  background-color: #23418f;
}

.text-enigma {
  color: #23418f;
}
```

### PART Component and Module

> 1. Create `resume module` `src/app/resume`
> 2. Create `resume component` `src/app/resume`
> 3. Create `content component` `src/app/resume/component/content`
> 4. Create `sidebar component` `src/app/resume/component/sidebar`
> 5. Create `shared module` `src/app/shared`
> 6. Create `header component` `src/app/shared/components/header`
> 7. Reference `personal-resume` https://git.enigmacamp.com/enigma-camp/class-booster/angular-course/course-material/-/blob/master/1-html-css/personal-resume/index.html

Open `resume.component.html`

```html
<div class="row">
  <aside class="col-sm-4 bg-dark text-white">
    <app-resume-sidebar></app-resume-sidebar>
  </aside>
  <section class="col-sm ps-5 pe-4 py-4">
    <app-resume-content></app-resume-content>
  </section>
</div>
```

Open `sidebar.component.html`

```html
<div class="row justify-content-center">
  <div class="col-sm-10 py-5">
    <img
      src="assets/images/profile.jpg"
      alt="My Profile"
      class="img-thumbnail rounded-circle mx-auto d-block"
    />
  </div>
  <div class="col-sm-10">
    <h1 class="text-center fs-3">
      Fahreza Muzakki<br /><span class="fs-5">Fullstack Developer</span>
    </h1>
  </div>
  <hr class="col-sm-10 mb-4" />
  <div class="col-sm-10">
    <h2 class="fs-5 mb-3">Contact</h2>
    <dl class="row">
      <dt class="col-1"><i class="bi-telephone-fill"></i></dt>
      <dd class="col-11">
        <a href="tel:+62 8987654321" class="text-white text-decoration-none"
          >+62 8987654321</a
        >
      </dd>
      <dt class="col-1"><i class="bi-at"></i></dt>
      <dd class="col-11">
        <a
          href="mailto:fahreza.muzakki@gmail.com"
          class="text-white text-decoration-none"
        >
          fahreza.muzakki@gmail.com
        </a>
      </dd>
      <dt class="col-1"><i class="bi-geo-alt-fill"></i></dt>
      <dd class="col-11">Jakarta, Indonesia</dd>
    </dl>
  </div>
  <hr class="col-sm-10 mb-4" />
  <div class="col-sm-10">
    <h2 class="fs-5 mb-3">Skills</h2>
    <dl class="row">
      <dt class="col-9 fw-normal">Javascript</dt>
      <dd class="col-3 fw-bold">75%</dd>
      <dt class="col-9 fw-normal">HTML</dt>
      <dd class="col-3 fw-bold">80%</dd>
      <dt class="col-9 fw-normal">CSS</dt>
      <dd class="col-3 fw-bold">75%</dd>
    </dl>
  </div>
  <hr class="col-sm-10 mb-4" />
  <div class="col-sm-10 mb-4">
    <h2 class="fs-5 mb-3">Languages</h2>
    <p>
      <span class="badge bg-secondary fs-6 m-1">Indonesia</span>
      <span class="badge bg-secondary fs-6 m-1">English</span>
      <span class="badge bg-secondary fs-6 m-1">Arabic</span>
    </p>
  </div>
  <hr class="col-sm-10 mb-4" />
  <div class="col-sm-10 mb-4">
    <h2 class="fs-5 mb-3">Hobbies</h2>
    <p>
      <span class="badge rounded-pill bg-secondary fs-6 m-1">Driving</span>
      <span class="badge rounded-pill bg-secondary fs-6 m-1">Coding</span>
      <span class="badge rounded-pill bg-secondary fs-6 m-1">Traveling</span>
    </p>
  </div>
  <hr class="col-sm-10 mb-4" />
  <div class="col-sm-10 mb-4">
    <h2 class="fs-5 mb-3">Social Media</h2>
    <dl class="row">
      <dt class="col-1"><i class="bi-github"></i></dt>
      <dd class="col-11">
        <a href="#github" class="text-white text-decoration-none"
          >fahreza.dev</a
        >
      </dd>
      <dt class="col-1"><i class="bi-linkedin"></i></dt>
      <dd class="col-11">
        <a href="#linkedin" class="text-white text-decoration-none">
          fahreza.muzakki
        </a>
      </dd>
      <dt class="col-1"><i class="bi-facebook"></i></dt>
      <dd class="col-11">
        <a href="#linkedin" class="text-white text-decoration-none">
          fb.me/fahreza.muzakki
        </a>
      </dd>
    </dl>
  </div>
</div>
```

Open `content.component.html`

```html
<div class="row mb-5">
  <div class="col">
    <h2 class="text-enigma text-uppercase">Objective</h2>
    <hr class="col mb-4" />
    <p class="text-justify">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum
      fringilla lacus. Morbi aliquam elit in consequat maximus. Nullam pharetra
      vestibulum aliquet. Nam eget est quis mauris feugiat rhoncus. Etiam ut
      lectus bibendum, porttitor tortor eget, accumsan risus. Aenean nec
      elementum mauris, eget faucibus arcu. Pellentesque rhoncus elementum elit,
      eget rutrum risus faucibus ut. Nam maximus, libero et pulvinar consequat,
      massa felis ullamcorper mauris, sit amet vestibulum lacus mauris ut
      lectus. Duis molestie magna a tincidunt fermentum. Suspendisse sagittis,
      ligula nec vulputate tincidunt, felis diam consectetur ligula, quis rutrum
      ante risus bibendum lorem. Suspendisse vel efficitur nunc. Nulla pulvinar
      elit a sapien imperdiet, quis pretium diam vulputate. Sed a convallis
      libero. Quisque vel scelerisque erat.
    </p>
    <figure class="text-center mt-5">
      <blockquote class="blockquote">
        <p>
          "Programming isn't about what you know; it's about what you can figure
          out.”
        </p>
      </blockquote>
      <figcaption class="blockquote-footer">Chris Pine</figcaption>
    </figure>
  </div>
</div>
<div class="row mb-5">
  <div class="col">
    <h2 class="text-enigma text-uppercase">Experience</h2>
    <hr class="col mb-4" />
    <div class="row">
      <div class="col-1 text-dark d-none d-md-block">
        <i class="bi-geo fs-1"></i>
      </div>
      <div class="col-11">
        <p class="lead mb-1">Fullstack Developer</p>
        <p class="text-uppercase">
          <strong class="border-end border-2 border-secondary pe-2 me-2"
            >EnigmaCamp IT Bootcamp</strong
          >Oct 2019 - Present
        </p>
        <ul class="list-unstyled">
          <li><i class="bi-check text-dark"></i> Design a system.</li>
          <li>
            <i class="bi-check text-dark"></i> Design an application interface.
          </li>
          <li><i class="bi-check text-dark"></i> Develop a backend service.</li>
          <li>
            <i class="bi-check text-dark"></i> Develop a frontend service.
          </li>
          <li><i class="bi-check text-dark"></i> Deploy an application.</li>
        </ul>
      </div>
    </div>
    <section class="row">
      <aside class="col-1 text-dark d-none d-md-block">
        <i class="bi-geo fs-1"></i>
      </aside>
      <section class="col-lg-11 col-12">
        <p class="lead mb-1"><strong>Backend Developer</strong></p>
        <p class="text-uppercase">
          <strong class="border-end border-2 border-secondary pe-2 me-2"
            >Construct Enterprise</strong
          >Jan 2017 - Oct 2019
        </p>
        <ul class="list-unstyled">
          <li>
            <i class="bi-check text-dark"></i> Develop a RESTFUL API service.
          </li>
          <li><i class="bi-check text-dark"></i> Develop a queue system.</li>
          <li><i class="bi-check text-dark"></i> Develop a mailer system.</li>
          <li>
            <i class="bi-check text-dark"></i> Develop a notification system.
          </li>
        </ul>
      </section>
    </section>
    <section class="row">
      <aside class="col-1 text-dark d-none d-md-block">
        <i class="bi-geo fs-1"></i>
      </aside>
      <section class="col-lg-11 col-12">
        <p class="lead mb-1"><strong>Frontend Developer</strong></p>
        <p class="text-uppercase">
          <strong class="border-end border-2 border-secondary pe-2 me-2"
            >Digital Display</strong
          >Dec 2016 - Jan 2017
        </p>
        <ul class="list-unstyled">
          <li>
            <i class="bi-check text-dark"></i> Develop a backoffice web
            application.
          </li>
          <li>
            <i class="bi-check text-dark"></i> Develop a portal web application.
          </li>
          <li>
            <i class="bi-check text-dark"></i> Develop a company profile web
            application.
          </li>
          <li>
            <i class="bi-check text-dark"></i> Develop a single page
            application.
          </li>
        </ul>
      </section>
    </section>
  </div>
</div>
<div class="row mb-5">
  <div class="col">
    <h2 class="text-enigma text-uppercase">Education</h2>
    <hr class="col mb-4" />
    <section>
      <p class="lead mb-1"><strong>S1 - Information System</strong></p>
      <p class="text-uppercase">
        <strong class="border-end border-2 border-secondary pe-2 me-2"
          >Gunadarma University</strong
        >2012 - 2016
      </p>
    </section>
    <section>
      <p class="lead mb-1"><strong>Science</strong></p>
      <p class="text-uppercase">
        <strong class="border-end border-2 border-secondary pe-2 me-2"
          >Public High School 28 Jakarta</strong
        >2009 - 2012
      </p>
    </section>
  </div>
</div>
<div class="row justify-content-center mb-4">
  <section class="d-grid col-md-5">
    <button class="btn btn-warning btn-lg shadow" id="connect">
      Let's Connect!
    </button>
  </section>
</div>
```

Open `header.component.htm`

```html
<div class="row">
  <div class="col px-0">
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-enigma">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          ><i class="bi bi-code-slash"></i> My Page</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
              >
                Demo Apps
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><a class="dropdown-item" href="#">Bank Account</a></li>
                <li><a class="dropdown-item" href="#">Todo List</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact Me</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>
```

### PART Assets

> 1. Adding image in project
