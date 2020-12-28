export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{busHistory.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/businessProfile">{{busHistory.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{busHistory.title}}</h1>
    <p class="subtitle__businessDash">{{busHistory.subtitle}}</p>
</header>

<div class="busDashboard">
   <h2> {{busHistory.info}} </h2>
</div>
`;