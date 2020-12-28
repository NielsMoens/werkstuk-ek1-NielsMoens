export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{busInfo.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/businessProfile">{{busInfo.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{busInfo.title}}</h1>
    <p class="subtitle__businessDash">{{busInfo.subtitle}}</p>
</header>

<div class="busDashboard">
   <h2> {{busInfo.info}} </h2>
</div>
`;