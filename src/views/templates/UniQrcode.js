export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{uniqueCode.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/businessProfile">{{uniqueCode.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{uniqueCode.title}}</h1>
    <p class="subtitle__businessDash">{{uniqueCode.subtitle}}</p>
</header>

<div class="unicode">
   <h2> {{uniqueCode.info}} </h2>
</div>

`;