export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{profilInfoBusiness.logout}}"><i class="fas fa-long-arrow-alt-left"></i></a></li>
        <li><a href="/visitorDashboard/profileInfo">{{profilInfoBusiness.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>

    <h1>{{profilInfoBusiness.title}}</h1>
    <p class="subtitle__businessDash">{{profilInfoBusiness.subtitle}}</p>
</header>

<div class="busDashboard">
    <h2> {{profilInfoBusiness.info}} </h2>
    <form action="POST">
        <input name="firstname" id="firstname" placeholder="{{profilInfoBusiness.busName}}" type="text">
        <input name="lastname" id="lastname" placeholder="{{profilInfoBusiness.Maxcapa}}" type="text">
        <input name="dateofbirth" id="dateofbirth" placeholder="{{profilInfoBusiness.firstname}}" type="text">
        <input name="phonenum" id="phonenum" placeholder="{{profilInfoBusiness.lastname}}" type="text">
        <input name="phonenum" id="phonenum" placeholder="{{profilInfoBusiness.dateofbirth}}" type="text">
        <input name="phonenum" id="phonenum" placeholder="{{profilInfoBusiness.phonenum}}" type="text">
    </form>
</div>
`;