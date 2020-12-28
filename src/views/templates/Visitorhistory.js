export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{vishistory.logout}}"><i class="fas fa-sign-out-alt"></i></a></li>
        <li><a href="/businessProfile">{{vishistory.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{vishistory.title}}</h1>
    <p class="subtitle__businessDash">{{vishistory.subtitle}}</p>
</header>

<div class="busDashboard">
   <h2> {{vishistory.info}} </h2>
</div>
`;