export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{profilInfo.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/businessProfile">{{profilInfo.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{profilInfo.title}}</h1>
    <p class="subtitle__businessDash">{{profilInfo.subtitle}}</p>
</header>

<div class="busDashboard">
   <h2> {{profilInfo.info}} </h2>
</div>
`;