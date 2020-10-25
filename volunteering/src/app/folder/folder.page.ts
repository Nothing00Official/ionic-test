import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;
    projects: Project[] = new Array();

    loading: boolean = false;

    page: number = 1;
    count: number;

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


    constructor(private activatedRoute: ActivatedRoute, public http: HttpClient) {
        this.loadCount();
    }

    loadProject(page) {
        this.loading = true;
        this.http.get<Project[]>("https://tech.unidea.org/api/app.php?q=list&page=" + page).subscribe(res => {
            this.projects = res;
            this.loading = false;
        })
    }

    loadCount() {
        this.loading = true;
        this.http.get<Project[]>("https://tech.unidea.org/api/app.php?q=count").subscribe(res => {
            this.count = res["num"];
            this.loading = false;
            this.loadProject(1);
        })
    }

    loadData() {
        setTimeout(async () => {
            if (this.projects.length < this.count) {
                await this.wait(500);
                this.infiniteScroll.complete();
                this.page++;
                this.loadProject(this.page);
            } else {
                this.infiniteScroll.disabled = true;
            }
        }, 500);
    }

    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }

    wait(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

}
