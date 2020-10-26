import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-project',
    templateUrl: './project.page.html',
    styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

    loading: boolean = false;
    project: Project;

    constructor(private activatedRoute: ActivatedRoute, public http: HttpClient) { }

    ngOnInit() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.loadProject(id);
    }

    loadProject(id) {
        this.loading = true;
        this.http.get<Project>("https://tech.unidea.org/api/app.php?q=project&title=" + id).subscribe(res => {
            this.project = res;
            this.loading = false;
            setTimeout(() => {
                console.log("ciao")
                document.getElementById("content").innerHTML = decodeURIComponent(window.atob(this.project.content));
            }, 2000)
        })
    }


}
