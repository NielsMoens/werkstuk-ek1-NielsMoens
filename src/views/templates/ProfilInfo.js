export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{profilInfo.logout}}"><i class="fas fa-long-arrow-alt-left"></i></a></li>
        <li><a href="/businessProfile">{{profilInfo.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{profilInfo.title}}</h1>
    <p class="subtitle__visitorDash">{{profilInfo.subtitle}}</p>
</header>

<div class="busDashboard">
   <h2> {{profilInfo.info}} </h2>
   <form action="POST">
    <input name="firstname" id="firstname" placeholder="{{profilInfo.firstname}}" type="text">
       <input name="lastname" id="lastname" placeholder="{{profilInfo.lastname}}" type="text">
       <input name="dateofbirth" id="dateofbirth" placeholder="{{profilInfo.dateofbirth}}" type="text">
       <input name="phonenum" id="phonenum" placeholder="{{profilInfo.phonenum}}" type="text">
   </form>
   
</div>
`;