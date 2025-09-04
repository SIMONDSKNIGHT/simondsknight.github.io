---
title: Work
---

<ul class="list">
{% assign ps = site.projects | sort: "year" | reverse %}
{% for p in ps %}
  <li>
    <!--Title-->
    <a href="{{ p.url | relative_url }}"><strong>{{ p.title }}</strong></a>

    {% if p.summary %}<br><span class="muted">{{ p.summary }}</span>{% endif %}

    <!-- Tech stack -->
    {% if p.stack %}<br><span class="muted">{{ p.stack | join: ', ' }}</span>{% endif %}


    {% if p.year %}<span class="pill">{{ p.year }}</span>{% endif %}
  </li>
{% endfor %}
</ul>