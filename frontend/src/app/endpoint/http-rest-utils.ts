import {HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestFilters} from "../types/request-types";

export interface Pagination {
  page: number;
  size?: number;
  sort?: string[];
}

export interface Search {
  [field: string]: any;
}

export interface SearchWithPagination extends Search, Pagination {
}

export const filterTransform = (reqFilter: RequestFilters): { [key: string]: string } => {
  const trasnformedFilter = {};
  if (!reqFilter) {
    return trasnformedFilter;
  }
  if (reqFilter.areaOfInterest) {
    trasnformedFilter['areaOfInterest.equals'] = reqFilter.areaOfInterest;
  }
  if (reqFilter.statuses && reqFilter.statuses.length > 0) {
    trasnformedFilter['status.in'] = reqFilter.statuses;
  }
  if (reqFilter.startDate) {
    trasnformedFilter['startDate.greaterThan'] = reqFilter.startDate.toISOString();
  }
  if (reqFilter.endDate) {
    trasnformedFilter['endDate.lessThan'] = reqFilter.endDate.toISOString();
  }
  if (reqFilter.total) {
    trasnformedFilter['numberOfResource.equals'] = reqFilter.total;
  }
  if (reqFilter.seniority) {
    trasnformedFilter['seniorityOfResource.equals'] = reqFilter.seniority;
  }
  if (reqFilter.skills && reqFilter.skills.length > 0) {
    trasnformedFilter[`skillsOfResource.in`] = reqFilter.skills.join(',');
  }

  return trasnformedFilter;
}

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }

  return options;
};

/**
 * Method to parse the links
 */
export const parsePaginationResponseHeader = (headers: HttpHeaders): { total: number, links: { [key: string]: string } } => {
  if (!headers) {
    return {
      total: 0,
      links: null
    };
  }
  const total = parseInt(headers.get('x-total-count'), 10);
  const links = parseLink(headers.get('link'));

  return {
    total: total,
    links: links
  };
}

const parseLink = (header: string): { [key: string]: string } => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }

  // Split parts by comma
  const parts: string[] = header.split(',');
  const links: any = {};

  // Parse each part into a named link
  parts.forEach(p => {
    const section: string[] = p.split(';');

    if (section.length !== 2) {
      throw new Error('section could not be split on ";"');
    }

    const url: string = section[0].replace(/<(.*)>/, '$1').trim();
    const queryString: any = {};

    url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3));

    let page: any = queryString.page;

    if (typeof page === 'string') {
      page = parseInt(page, 10);
    }

    const name: string = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = page;
  });
  return links;
}
