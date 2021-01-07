export default `
<header class="head">
    <ul class="head__nav">
        <li><a href="{{activevisitor.logout}}"><i class="fas fa-sign-out-alt"></i> </a></li>
        <li><a href="/businessProfile">{{activevisitor.UserName}} <i class="fas fa-user"></i></a></li>
    </ul>
    <h1 class="head__title">{{activevisitor.title}}</h1>
    <p class="head__subtitle">{{activevisitor.subtitle}}</p>
</header>

<div class="activeVisitor">
   <h2 class="activeVisitor__title"> {{activevisitor.info}} </h2>
   {{#with activevisitor as | activevisitor |}}
    {{#if activevisitor.resolvedUsers}}
      {{#each resolvedUsers}}
        <li class="activeVisitor__users">{{this.firstname}} {{this.lastname}} <br>{{this.lastDate}}</li>
      {{/each}}
    {{else}}
      <li>No checkins</li>
    {{/if}}
   {{/with}}
</div>
`;