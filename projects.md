---
layout: page
title: Projects
permalink: /projects/
---

<div class="boundingBox" id="content">

	<ul id="portfolio-filter">
		<li><a href="#all" title="" class="">All</a></li>
	    {% for category in site.projectsCategories %}
	   		<li>
	   			<a href="#{{ category.slug }}" title="" rel="{{ category.slug }}" class="">{{ category.name }}</a>
	   		</li>
	    {% endfor %}
	</ul>
	<hr />
	<ul id="portfolio-list">
		{% for project in site.projects %}
		<li class="{{ project.categories }}">
			
			<h2>
				{{ project.name }}
			</h2>

			<p>
				{{ project.desc }}
			</p>
			
			<a href="{{ project.link }}" title="">
				<img src="{{ project.image }}" alt="">
			</a>		
		</li>	
		{% endfor %}					
	</ul>
		
	</div>