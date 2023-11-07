import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable, of } from 'rxjs';
import { UserService } from '../user/user.service';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ApiService {

  private baseUrl = environment.baseApiUrl + '/';
  private socket;
  private headers: HttpHeaders;
  private userId;
  public onlineUsersArr: any[] = [];
  public jobCandidateHistory;
  constructor(private http: HttpClient,private userService:UserService){
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    const user =  this.userService.getCurrentUser();
    if(user){
      this.userId = user.id;
      this.socket = io(this.baseUrl);

      this.socket.emit('connectedUser', this.userId);
    }
  }
  public sendMessage(message) {
    return this.socket.emit('new-message', JSON.stringify(message));
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
    });
  }
  public connectUser = () => {
    return Observable.create((observer) => {
        this.socket.on('connectedUser', (message) => {
            observer.next(message);
        });
    });
  }
  public disconnectUser = () => {
    return Observable.create((observer) => {
        this.socket.on('disconnect', (message) => {
            observer.next(message);
        });
    });
  }

  getJobs(showClosed){
    if(showClosed){
      return this.http.get(this.baseUrl + 'closedJobs', {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
        })
      });
    } else{
      return this.http.get(this.baseUrl + 'jobs', {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
        })
      });
    }

  }
  getJobsBase(){
    return this.http.get(this.baseUrl + 'jobsBase', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
       })
    });
  }
  getGeneralMessages(){
    return this.http.get(this.baseUrl + 'generalMessages', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  addGeneralMessage(body){
    return this.http.post(this.baseUrl + 'generalMessages',body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  addNotifications(body){
    return this.http.post(this.baseUrl + 'notifications',body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getUserMessages(){
    return this.http.get(this.baseUrl + 'userMessages', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getjobCandidateHistoryByUser(){
    if(this.jobCandidateHistory){
      return of(this.jobCandidateHistory)
    }
    return  this.http.get(this.baseUrl + 'jobCandidateHistoryByUser', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    }).pipe(
      tap((res) => this.jobCandidateHistory = res),
    );
  }
  getJobCandidateByUser(Id: any) {
    return this.http.get(this.baseUrl + 'jobCandidateByUser?u='+Id,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getNotifications() {
    return this.http.get(this.baseUrl + 'notifications',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getBonusesByUser(Id: any) {
    return this.http.get(this.baseUrl + 'bonusesByUser?u='+Id,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  candidateJobsByUser(candidateId){
    return this.http.get(this.baseUrl + 'candidateJobsByUser?CandidateId='+ candidateId + '&u='+this.userId,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });

  }
  
  getReportsTable(){
    return this.http.get(this.baseUrl + 'report',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getJobCandidateCompletedHistory(){
    return this.http.get(this.baseUrl + 'jobCandidateCompletedHistory',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getUserRanking(){
    return this.http.get(this.baseUrl + 'userRanking',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  
  getJobCandidateHistory(jobCandidateId){
    return this.http.get(this.baseUrl + 'jobCandidateHistory?jobCandidateId='+jobCandidateId,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getCandidates(){
    //TODO: cache!!
    if(!this.userId){
      const u = this.userService.getCurrentUser()
      if(!u){
        setTimeout(() => {
          this.getCandidates()
        }, 500);
      }
      this.userId = u.id;
    }
    return this.http.get(this.baseUrl + 'candidates?u='+this.userId,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getUsersBase(){
    return this.http.get(this.baseUrl + 'usersBase',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getPoolCandidates(){
    return this.http.get(this.baseUrl + 'poolCandidates',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  isPremittedToPool(){
    return this.http.get(this.baseUrl + 'isPremittedToPool',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getcoordinatorsTable(onlyHr = false){
    return this.http.get(this.baseUrl + 'coordinatorsTable?onlyHr=' + onlyHr ,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getCoordinatorsSummary(){
    return this.http.get(this.baseUrl + 'coordinatorsSummary',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getLookups(){
    return this.http.get(this.baseUrl + 'lookups',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getUserManagers(){
    return this.http.get(this.baseUrl + 'userManagers',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  getKnownCandidateHistory(candidateId){
    return this.http.get(this.baseUrl + 'knownCandidateHistory?CandidateId=' + candidateId,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  addCandidate(candidate){
    return this.http.post(this.baseUrl + 'candidate?u='+(this.userId),candidate, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  addExternalCandidate(candidate,userId){
    return this.http.post(this.baseUrl + 'ExternalCandidate?u='+(userId || this.userId),candidate, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }
  addExternalJobCandidate(jc){
    return this.http.post(this.baseUrl + 'ExternalJobCandidate',jc,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }
  addJobCandidate(jc){
    return this.http.post(this.baseUrl + 'jobCandidate',jc,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  addPoolCandidateToUser(candidateId,originalUserId,originalCandidateId){
    return this.http.post(this.baseUrl + 'poolCandidateToUser',{candidateId,originalUserId,originalCandidateId},{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  deleteJobCandidate(id){
    return this.http.post(this.baseUrl + 'deleteJobCandidate',{id:id},{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  updateJobCandidate(jc){
    return this.http.put(this.baseUrl + 'jobCandidate',jc,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  AddUserMessage(formData){
    return of(this.sendMessage(formData));
    // return this.http.post(this.baseUrl + 'userMessage',formData,{
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
    //   })
    // });
  }
  updateCandidate(candidate){
    return this.http.put(this.baseUrl + 'candidate',candidate,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  updateCandidateIsFromPool(formData){
    return this.http.put(this.baseUrl + 'CandidateIsFromPool',formData,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  updateCandidateFileExtension(formData){
    return this.http.put(this.baseUrl + 'CandidateFileExtension',formData,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }
  updateJobUserId(formData){
    return this.http.put(this.baseUrl + 'jobUserId',formData,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  uploadCV(formData){
    return this.http.post(this.baseUrl + 'api/upload',formData,{
      headers: new HttpHeaders({
      //  'Content-Type':  'application/json',
      //  'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  downloadCv(id){
    return this.http.get(this.baseUrl + 'download?fileName='+id,{
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
                                .append("Authorization",'Bearer ' +  JSON.parse(localStorage.auth_app_token).value)
    });
  }
  searchJobCandidates(q){
    return this.http.post(this.baseUrl + 'searchJobCandidates',q,{
      headers: new HttpHeaders().append("Content-Type", "application/json")
                                .append("Authorization",'Bearer ' +  JSON.parse(localStorage.auth_app_token).value)
    });
  }
  addJob(job){
    return this.http.post(this.baseUrl + 'job',job,{
      headers: new HttpHeaders({
      //  'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }

  uploadExcel(formData){
    return this.http.post(this.baseUrl + 'api/uploadJobs',formData,{
      headers: new HttpHeaders({
      //  'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  updateJobCandidateStatus(formData){
    return this.http.put(this.baseUrl + 'jobCandidateStatus',formData,{
      headers: new HttpHeaders({
      //  'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  updateJobCandidateIsRead(formData){
    return this.http.put(this.baseUrl + 'jobCandidateIsRead',formData,{
      headers: new HttpHeaders({
      //  'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  updateJobCandidateIsCoordinatorRead(formData){
    return this.http.put(this.baseUrl + 'jobCandidateIsCoordinatorRead',formData,{
      headers: new HttpHeaders({
      //  'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }

  UpdateJobCandidateHistory(formData){
    return this.http.put(this.baseUrl + 'JobCandidateHistory',formData,{
      headers: new HttpHeaders({
      //  'Content-Type':  'application/json',
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.auth_app_token).value
      })
    });
  }
  addContactForm(formData){
    return this.http.post(this.baseUrl + 'contactForm',formData, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });
  }
  signInGoogle(formData){
    return this.http.post(this.baseUrl + 'auth/sign-in-google',formData, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }
}
