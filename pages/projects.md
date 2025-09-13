---
title: Projects
layout: projects
permalink: /projects/
---

# Projects

<ul class="grid">
{% assign ps = site.projects | sort: "year" | reverse %}
{% for p in ps %}
  <li>
    <a class="card" href="{{ p.url | relative_url }}" data-target="tpl-{{ p.slug | default: p.name }}">
      {% if p.thumb %}<img src="{{ p.thumb | relative_url }}" alt="" width="480" height="300" loading="lazy">{% endif %}
      <div class="card__body">
        <h3>{{ p.title }}</h3>
        {% if p.summary %}<p>{{ p.summary }}</p>{% endif %}
      </div>
    </a>
  </li>
{% endfor %}
</ul>

{% for p in ps %}
<template id="tpl-{{ p.slug | default: p.name }}">
  <article class="project-modal">
    <header class="project-modal__header">
      <h1 id="modal-title">{{ p.title }}</h1>
      {% if p.stack %}<p class="muted"><strong>Stack:</strong> {{ p.stack | join: ', ' }}</p>{% endif %}
      {% if p.links %}
        <p class="project-modal__links">
          {% for l in p.links %}
            <a href="{{ l.url }}" target="_blank" rel="noopener">{{ l.label }}</a>{% unless forloop.last %} · {% endunless %}
          {% endfor %}
        </p>
      {% endif %}
    </header>

    <section class="project-modal__layout">
      <div class="project-modal__media">
        {% if p.gif %}
          <img class="project-media" src="{{ p.gif | relative_url }}" alt="" width="960" height="540" loading="lazy">
        {% elsif p.hero %}
          <img class="project-media" src="{{ p.hero | relative_url }}" alt="" width="960" height="540" loading="lazy">
        {% elsif p.thumb %}
          <img class="project-media" src="{{ p.thumb | relative_url }}" alt="" width="960" height="540" loading="lazy">
        {% endif %}
      </div>
      <div class="project-modal__details">
        {{ p.content }}
      </div>
    </section>
  </article>
</template>
{% endfor %}
