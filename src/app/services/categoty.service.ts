import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { Category, CategoryApi } from '../response/Category/category.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListCategoryRequest } from '../requests/category/list-category.request';
import { map } from 'rxjs/operators';
import { CategoryRequest } from '../requests/category.reques';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategotyService {

  constructor(
    private _http: HttpClient,
    private _alert: AlertService
  ) { }

  GetAll(
    size,
    sort,
    order,
    page,
    getInputs
  ): Observable<CategoryApi>{
    const requestUrl = `${env.api}${endpoint.LIST_CATEGORIES}`
    const params: ListCategoryRequest = new ListCategoryRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
      getInputs.startDate,
      getInputs.EndDate
    );
    return this._http.post<CategoryApi>(requestUrl, params).pipe(
      map((data: CategoryApi) => {
        if (data.data && data.data.items) {
          data.data.items.forEach(function (e: any){
            switch(e.state){
              case 0:
                e.badgeColor = 'text-gray bg-gray-light';
                break;
              case 1:
                e.badgeColor = 'text-green bg-green-light';
                break;
              default:
                e.badgeColor = 'text-green bg-green-light';
                break;
            }
          });
        }
        return data;
      })
    )
  }

  CategoryRegister(category:CategoryRequest): Observable<ApiResponse>{
    const requestUrl = `${env.api}${endpoint.CATEGORY_REGISTER}`;
    return this._http.post(requestUrl, category).pipe(
      map((resp:ApiResponse) =>{
        return resp;
      })
    )
  }

  CategoryById(CategoryId:number): Observable<Category>{
    const requestUrl = `${env.api}${endpoint.CATEGORY_BY_ID}${CategoryId}`;
    return this._http.get(requestUrl).pipe(
      map((res: ApiResponse) =>{
        return res.data
      })
    )
  }

  CategoryEdit(categoryId:number, category:CategoryRequest): Observable<ApiResponse>{
    const requestUrl = `${env.api}${endpoint.CATEGORY_EDIT}${categoryId}`;
    return this._http.put(requestUrl, category).pipe(
      map((res: ApiResponse) =>{
        return res;
      })
    )
  }

  categoryRemove(categoryId:number): Observable<void>{
    const requestUrl = `${env.api}${endpoint.CATEGORY_REMOVE}${categoryId}`;
    return this._http.put(requestUrl, '').pipe(
      map((res: ApiResponse) =>{
        if(res.isSuccess){
          this._alert.success('Excelente', res.message)
        }
      })
    )
  }
}
