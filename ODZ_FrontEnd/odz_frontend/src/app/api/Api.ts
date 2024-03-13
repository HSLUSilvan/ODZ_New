export interface Aenderung {

  /** @format int32 */
  id?: number;
  datum?: DateOnly;

  /** @format int32 */
  aktion?: number | null;

  /** @format int32 */
  benutzer?: number | null;

  /** @format int32 */
  orgel?: number | null;

  /** @format int32 */
  massnahme?: number | null;

  /** @format int32 */
  kontakt?: number | null;

  /** @format int32 */
  literatur?: number | null;

  /** @format int32 */
  medium?: number | null;
  aktionNavigation?: Aktion;
  benutzerNavigation?: Benutzer;
}

export interface Aktion {
  /** @format int32 */
  id?: number;
  name?: string | null;
}

export interface Benutzer {
  /** @format int32 */
  id?: number;
  name?: string | null;
  passwort?: string | null;

  /** @format int32 */
  rolle?: number | null;
  bemerkung?: string | null;

  /** @format int32 */
  istgeloescht?: number | null;
  rolleNavigation?: Rolle;
  kontakts?: Kontakt[] | null;
  massnahmes?: Massnahme[] | null;
}

export interface DateOnly {
  /** @format int32 */
  year?: number;

  /** @format int32 */
  month?: number;

  /** @format int32 */
  day?: number;
  dayOfWeek?: DayOfWeek;

  /** @format int32 */
  dayOfYear?: number;

  /** @format int32 */
  dayNumber?: number;
}

export interface Datum {
  /** @format int32 */
  id?: number;
  datum1?: DateOnly;
  bezeichnung?: string | null;
  pape?: string | null;
  bis?: DateOnly;
  gehaeuses?: Gehaeuse[] | null;
  kontaktAufloesungsdatumNavigations?: Kontakt[] | null;
  kontaktBeerdigungsdatumNavigations?: Kontakt[] | null;
  kontaktGeburtsdatumNavigations?: Kontakt[] | null;
  kontaktGruendungsdatumNavigations?: Kontakt[] | null;
  kontaktSterbedatumNavigations?: Kontakt[] | null;
  kontaktTaufdatumNavigations?: Kontakt[] | null;
  massnahmes?: Massnahme[] | null;
  media?: Medium[] | null;
  orgelDatumbaugebaudeNavigations?: Orgel[] | null;
  orgelNeubaudatumNavigations?: Orgel[] | null;
}

/**
 * @format int32
 */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Gehaeuse {
  /** @format int32 */
  id?: number;
  stilgehaeuse?: string | null;

  /** @format int32 */
  datumgehaeuse?: number | null;
  materialgehaeuse?: string | null;
  fassunggehaeuse?: string | null;
  verziehrungengehaeuse?: string | null;
  prospektregister?: string | null;
  prospektanzahlpfeifen?: string | null;
  prospektklingend?: string | null;
  gehäuseinschriften?: string | null;
  gehäuseerhalten?: string | null;
  kommentargehaeuse?: string | null;

  /** @format int32 */
  idorgelvorher?: number | null;

  /** @format int32 */
  idorgelnachher?: number | null;
  datumgehaeuseNavigation?: Datum;
  idNavigation?: Massnahme;
}

export interface Kanton {
  /** @format int32 */
  id?: number;
  name?: string | null;
  namekurz?: string | null;
  orts?: Ort[] | null;
}

export interface Kontakt {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  typ?: number | null;

  /** @format int32 */
  ort?: number | null;
  adresse?: string | null;
  kommentar?: string | null;

  /** @format int32 */
  benutzer?: number | null;
  quelle?: string | null;

  /** @format int32 */
  istorgelexperte?: number | null;

  /** @format int32 */
  istorgelbauer?: number | null;

  /** @format int32 */
  isturheber?: number | null;
  name?: string | null;
  vorname?: string | null;
  synonyme?: string | null;

  /** @format int32 */
  geburtsdatum?: number | null;

  /** @format int32 */
  geburtsort?: number | null;

  /** @format int32 */
  taufdatum?: number | null;
  namemutter?: string | null;
  namevater?: string | null;

  /** @format int32 */
  sterbedatum?: number | null;

  /** @format int32 */
  sterbeort?: number | null;

  /** @format int32 */
  beerdigungsdatum?: number | null;
  generation?: string | null;
  name1?: string | null;
  name2?: string | null;
  firmentyp?: string | null;
  vorgaenger?: string | null;

  /** @format int32 */
  gruendungsdatum?: number | null;

  /** @format int32 */
  aufloesungsdatum?: number | null;
  nachfolger?: string | null;
  pBez?: string | null;

  /** @format int32 */
  xid?: number | null;

  /** @format int32 */
  istsichbar?: number | null;
  aufloesungsdatumNavigation?: Datum;
  beerdigungsdatumNavigation?: Datum;
  benutzerNavigation?: Benutzer;
  geburtsdatumNavigation?: Datum;
  geburtsortNavigation?: Ort;
  gruendungsdatumNavigation?: Datum;
  ortNavigation?: Ort;
  sterbedatumNavigation?: Datum;
  sterbeortNavigation?: Ort;
  taufdatumNavigation?: Datum;
  typNavigation?: Kontakttyp;
  literaturKontakts?: LiteraturKontakt[] | null;
  massnahmes?: Massnahme[] | null;
  media?: Medium[] | null;
  orgels?: Orgel[] | null;
  orts?: Ort[] | null;
}

export interface Kontakttyp {
  /** @format int32 */
  id?: number;
  name?: string | null;
  kontakts?: Kontakt[] | null;
}

export interface Labiale {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  register?: number;
  signaturpfeife?: string | null;
  positionaktuell?: string | null;
  formkoerper?: string | null;

  /** @format float */
  laengekoerper?: number | null;

  /** @format float */
  material?: number | null;

  /** @format float */
  umfangunten?: number | null;

  /** @format float */
  umfangmitte?: number | null;

  /** @format float */
  umfangoben?: number | null;

  /** @format float */
  aufschnitthöhelinks?: number | null;

  /** @format float */
  aufschnitthöhemitte?: number | null;

  /** @format float */
  aufschnitthöherecht?: number | null;

  /** @format float */
  oberelabiumbreite?: number | null;
  baerte?: string | null;
  stimmvorrichtungen?: string | null;
  fusslänge?: string | null;
  quellen?: string | null;
  kommentarlabiale?: string | null;
  registerNavigation?: Register;
}

export interface Laden {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  werk?: number;

  /** @format int32 */
  position?: number | null;
  name?: string | null;
  ladentypen?: string | null;
  winddruck?: string | null;
  tonumfangmanualwerke?: string | null;
  ladenerhalten?: string | null;
  dichtungsystemlade?: string | null;
  ventilordnunglade?: string | null;
  rasterbrettbeschreibung?: string | null;
  inschriften?: string | null;
  kommentarladen?: string | null;
  tonumfang?: string | null;

  /** @format int32 */
  xid?: number | null;
  werkNavigation?: Werk;
  registers?: Register[] | null;
}

export interface Land {
  /** @format int32 */
  id?: number;
  name?: string | null;
  namekurz?: string | null;
  orts?: Ort[] | null;
}

export interface Literatur {
  /** @format int32 */
  id?: number;
  autor?: string | null;
  titel?: string | null;
  biblAngaben?: string | null;
  signatur?: string | null;
  literaturKontakts?: LiteraturKontakt[] | null;
  literaturMassnahmes?: LiteraturMassnahme[] | null;
}

export interface LiteraturKontakt {
  /** @format int32 */
  literatur?: number;

  /** @format int32 */
  kontakt?: number;
  seitenangabe?: string | null;
  kontaktNavigation?: Kontakt;
  literaturNavigation?: Literatur;
}

export interface LiteraturMassnahme {
  /** @format int32 */
  literatur?: number;

  /** @format int32 */
  massnahme?: number;
  seitenangabe?: string | null;
  literaturNavigation?: Literatur;
  massnahmeNavigation?: Massnahme;
}

export interface Massnahme {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  orgel?: number | null;

  /** @format int32 */
  ort?: number | null;
  massnahme1?: string | null;

  /** @format int32 */
  massnahmedatum?: Date | null;
  massnahmeopusnummer?: string | null;
  massnahmekostenofferte?: string | null;
  massnahmekosteneffektiv?: string | null;

  /** @format int32 */
  anzahlmanuale?: number | null;

  /** @format int32 */
  anzahlmanualwerke?: number | null;
  koppelmanual?: string | null;

  /** @format int32 */
  anzahlgeplantermanuale?: number | null;

  /** @format int32 */
  anzahlregister?: number | null;

  /** @format int32 */
  anzahlpfeifenreihen?: number | null;

  /** @format int32 */
  anzahlfreierregisterpositionen?: number | null;

  /** @format int32 */
  anzahltransmissionen?: number | null;
  balganlage?: string | null;
  winderzeugung?: string | null;
  temperierung?: string | null;
  stimmtonhoehe?: string | null;
  spieltischspielschrank?: string | null;
  spielhilfen?: string | null;
  nebenregister?: string | null;
  intonation?: string | null;
  klang?: string | null;
  unterhalt?: string | null;
  kommentar?: string | null;
  quellen?: string | null;
  historischekomponenten?: string | null;
  textdisposition?: string | null;

  /** @format int32 */
  benutzer?: number | null;

  /** @format int32 */
  istsichtbar?: number | null;

  /** @format int32 */
  bassRegister?: number | null;

  /** @format int32 */
  diskantRegister?: number | null;

  /** @format int32 */
  anzahlauszuege?: number | null;

  /** @format int32 */
  anzahlverlaengerungen?: number | null;

  /** @format int32 */
  anzahlsammelzuege?: number | null;

  /** @format int32 */
  anzahlPfeiffen?: number | null;
  inschriftenFimenschild?: string | null;
  positionspieltisch?: string | null;
  spieltischerhalten?: string | null;

  /** @format int32 */
  anzahlpedal?: number | null;
  positionbalganlage?: string | null;
  balganlageerhalten?: string | null;
  balganlagetext?: string | null;
  texttemperierungStimmton?: string | null;
  benutzerNavigation?: Benutzer;
  massnahmedatumNavigation?: Datum;
  orgelNavigation?: Orgel;
  ortNavigation?: Ort;
  gehaeuse?: Gehaeuse;
  literaturMassnahmes?: LiteraturMassnahme[] | null;
  tastenreihes?: Tastenreihe[] | null;
  kontakts?: Kontakt[] | null;
  media?: Medium[] | null;
}

export interface Medium {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  mediumtyp?: number;

  /** @format byte */
  daten?: string | null;
  erfasstam?: DateOnly;
  name?: string | null;

  /** @format int32 */
  datum?: number | null;
  beschreibung?: string | null;
  datumNavigation?: Datum;
  mediumtypNavigation?: Mediumtyp;
  kontakts?: Kontakt[] | null;
  massnahmes?: Massnahme[] | null;
}

export interface Mediumtyp {
  /** @format int32 */
  id?: number;
  dateiendung?: string | null;
  name?: string | null;
  media?: Medium[] | null;
}

export interface Mixturkornette {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  register?: number;
  signaturpfeife?: string | null;
  positionaktuell?: string | null;

  /** @format int32 */
  repetitionton?: number | null;
  tonhoehe?: string | null;
  quellen?: string | null;
  kommentarmixturen?: string | null;
  registerNavigation?: Register;
}

export interface Orgel {
  /** @format int32 */
  id: number;
  orgelnummer: string | null;
  bezeichnung: string | null;

  /** @format int32 */
  neubaudatum: number | null;

  /** @format int32 */
  istsichbar: number | null;

  /** @format int32 */
  ort: number | null;
  gemeinde: string | null;
  ortsteil: string | null;
  adresse: string | null;
  gebaeude: string | null;
  gebaeudeteil: string | null;
  pfarre: string | null;
  konfession: string | null;

  /** @format int32 */
  datumbaugebaude: number | null;
  eigentuemer: string | null;
  orgelerhalten: string | null;
  latitude: number | null;
  longitude: number | null;

  /** @format int32 */
  idorgelvorher: number | null;
  datumbaugebaudeNavigation: Datum;
  idorgelvorherNavigatio?: Orgel;
  neubaudatumNavigation: Datum;
  ortNavigation: Ort;
  inverseIdorgelvorherNavigation: Orgel[] | null;
  massnahmes: Massnahme[] | null;
  kontakts: Kontakt[] | null;
}

export interface Ort {
  /** @format int32 */
  id?: number;
  name?: string | null;
  namevariante1?: string | null;
  namevariante2?: string | null;
  namevariante3?: string | null;
  plz?: string | null;

  /** @format int32 */
  kanton?: number | null;

  /** @format int32 */
  land?: number | null;
  kantonNavigation?: Kanton;
  landNavigation?: Land;
  kontaktGeburtsortNavigations?: Kontakt[] | null;
  kontaktOrtNavigations?: Kontakt[] | null;
  kontaktSterbeortNavigations?: Kontakt[] | null;
  massnahmes?: Massnahme[] | null;
  orgels?: Orgel[] | null;
  kontakts?: Kontakt[] | null;
}

export interface Register {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  laden?: number;

  /** @format int32 */
  position?: number | null;
  name?: string | null;
  tonhoehe?: string | null;
  kommentar?: string | null;

  /** @format int32 */
  positionlade?: number | null;
  material?: string | null;
  registererhalten?: string | null;

  /** @format int32 */
  idorgelvorher?: number | null;

  /** @format int32 */
  idorgelnachher?: number | null;

  /** @format int32 */
  xid?: number | null;
  ladenNavigation?: Laden;
  labiales?: Labiale[] | null;
  mixturkornettes?: Mixturkornette[] | null;
  zungens?: Zungen[] | null;
}

export interface Rolle {
  /** @format int32 */
  id?: number;
  name?: string | null;
  benutzers?: Benutzer[] | null;
}

export interface Tastenreihe {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  massnahme?: number;
  name?: string | null;

  /** @format int32 */
  position?: number | null;
  tastenumfang?: string | null;
  tiefeoktave?: string | null;
  subsemitonien?: string | null;
  materialtasten?: string | null;

  /** @format int32 */
  untertastenlaenge?: number | null;

  /** @format int32 */
  vorderteillaenge?: number | null;

  /** @format int32 */
  obertastenlaenge?: number | null;
  tastenhebel?: string | null;
  stichmass?: string | null;
  tastendruck?: string | null;
  manualeerhalten?: string | null;
  klaviaturerhalten?: string | null;
  pedaltyp?: string | null;
  pedalklaviaturstellung?: string | null;
  tastenumfangpedal?: string | null;
  tiefeoktavepedal?: string | null;
  tastenlaengepedalsichtbar?: string | null;
  materialpedaltasten?: string | null;
  pedalerhalten?: string | null;
  erhalten?: string | null;
  koppelmanual?: string | null;
  spieltraktur?: string | null;
  spieltrakturerhalten?: string | null;
  registertraktur?: string | null;
  typusregisterzuege?: string | null;
  registerbeschriftung?: string | null;
  registertrakturerhalten?: string | null;

  /** @format int32 */
  anzahltransmissionen?: number | null;

  /** @format int32 */
  anzahlauszuege?: number | null;

  /** @format int32 */
  anzahlverlaengerungen?: number | null;

  /** @format int32 */
  anzahlsammelzuege?: number | null;

  /** @format int32 */
  nebenregister?: number | null;
  kommentartastenreihe?: string | null;

  /** @format int32 */
  xid?: number | null;
  massnahmeNavigation?: Massnahme;
  werks?: Werk[] | null;
}

export interface Werk {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  tastenreihe?: number;

  /** @format int32 */
  position?: number | null;
  name?: string | null;
  werkschwellbar?: string | null;
  kommentarwerk?: string | null;

  /** @format int32 */
  xid?: number | null;
  tastenreiheNavigation?: Tastenreihe;
  ladens?: Laden[] | null;
}

export interface Zungen {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  register?: number;
  signaturpfeife?: string | null;
  positionaktuell?: string | null;
  form?: string | null;

  /** @format float */
  laengekoerper?: number | null;
  material?: string | null;

  /** @format float */
  umfangunten?: number | null;

  /** @format float */
  umfangmitte?: number | null;

  /** @format float */
  umfangoben?: number | null;

  /** @format float */
  zungenbreiteoben?: number | null;

  /** @format float */
  zungenbreiteunten?: number | null;

  /** @format float */
  zungendicke?: number | null;
  kehleform?: string | null;
  kehlematerial?: string | null;
  krueckematerial?: string | null;
  quellen?: string | null;
  kommentarzungen?: string | null;
  registerNavigation?: Register;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ODZ_BackEnd
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Organ
     * @name OrganList
     * @request GET:/api/Organ
     */
    organList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Organ`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organ
     * @name OrganCreate
     * @request POST:/api/Organ
     */
    organCreate: (data: Orgel, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Organ`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organ
     * @name OrganDetail
     * @request GET:/api/Organ/{id}
     */
    organDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Organ/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organ
     * @name OrganUpdate
     * @request PUT:/api/Organ/{id}
     */
    organUpdate: (id: number, data: Orgel, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Organ/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organ
     * @name OrganDelete
     * @request DELETE:/api/Organ/{id}
     */
    organDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Organ/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
