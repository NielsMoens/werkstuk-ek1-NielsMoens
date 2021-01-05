export default `
<header class="header_small">
    <ul id="nav">
        <li><a href="{{activevisitor.logout}}"><i class="fas fa-sign-out-alt"></i> </a></li>
        <li><a href="/businessProfile">{{activevisitor.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1>{{activevisitor.title}}</h1>
    <p class="subtitle__businessDash">{{activevisitor.subtitle}}</p>
</header>

<div class="busDashboard">
   <h2> {{activevisitor.info}} </h2>
   {{#each activevisitor.resolvedUsers}}
    <li>{{this.firstname}} {{this.lastname}} {{this.lastDate}}</li>
  {{/each}}
</div>
`;