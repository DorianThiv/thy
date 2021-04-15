import { ThyObjectType } from '../thy-objects/thy-types.class';
import { FormatService } from '../thy-format/format.service';
import { ThyFormatService } from '../thy-format/thy-format.service';
import { ThyPeriodModel } from '../../thy-modules/thy-period/models/thy-period-model.class';

class JsonRequest {

    private SessionKey: string;

    constructor(session: string) {
        if (session !== undefined) {
            this.SessionKey = session;
        }
    }

    // public static Build(): JsonRequest { return new JsonRequest(''); }
}

export class JsonConnection extends JsonRequest {

    protected Name;
    protected Password;
    protected UserId;

    constructor(name: string, pass: string, id: number) {
        super(undefined);
        this.Name = name;
        this.Password = pass;
        this.UserId = id;
    }

    public static Build(name: string, pass: string, id: number): JsonConnection {
        return new JsonConnection(name, pass, id);
    }
}

export class JsonCloseConnection extends JsonRequest {

    constructor(session: string) {
        super(session);
    }

    public static Build(session: string): JsonCloseConnection {
        return new JsonCloseConnection(session);
    }
}

export class JsonChangePassword extends JsonRequest {

    private NewPassword;
    private Password;

    constructor(session: string, password: string, newPassword: string) {
        super(session);
        this.Password = password;
        this.NewPassword = newPassword;
    }

    public static Build(session: string, password: string, newPassword: string): JsonChangePassword {
        return new JsonChangePassword(session, password, newPassword);
    }
}

interface IAttribute {
    Name: string;
    Period: any;
    NatureId: number;
}

export class JsonAttribValuesLocationTrend extends JsonRequest {
    private Id: number;
    private Type: number;
    private Attributes: any[] = [{ Name: 'Trend' }];

    constructor(session: string, id: number, type: number) {
        super(session);
        this.Id = id;
        this.Type = type;
    }

    public static Build(session: string, id: number, type: number): JsonAttribValuesLocationTrend {
        return new JsonAttribValuesLocationTrend(session, id, type);
    }
}

export class JsonAttribValuesReferenceConsumption extends JsonRequest {
    private Reference: string;
    private Attributes: any[] = [{
            Name: 'consumption',
            Period: {}
        }];

    constructor(session: string, reference: string, period: ThyPeriodModel) {
        super(session);
        this.Reference = reference;
        if (period !== undefined) {
            // @todo - period
            this.Attributes[0].Period = {
                Duration: period.Duration,
                Offset: period.Offset,
                Start: period.Start
            };
        }
    }

    public static Build(session: string, reference: string, period: ThyPeriodModel): JsonAttribValuesReferenceConsumption {
        return new JsonAttribValuesReferenceConsumption(session, reference, period);
    }
}

export class JsonAttribValues extends JsonRequest {

    private Id: number;
    private Type: number;

    private Attributes: any[];

    constructor(session: string, id: number, type: number, attributes?: any[]) {
        super(session);
        this.Id = id;
        if (type === ThyObjectType.Site) {
            type = ThyObjectType.Location;
        }
        this.Type = type;
    }

    public static Build(session: string, id: number, natureId: number, type: number, periods?: string[], locationId?: number): JsonAttribValues {
        const ret = new JsonAttribValues(session, id, type);
        if (!periods) {
            ret.Attributes = [
                { Name: 'nature' },
                { Name: 'unit' },
                { Name: 'location' },
                { Name: 'consumption', Period: { Duration: { Unit: 4, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 4 }, NatureId: 0 },
                { Name: 'consumption', Period: { Duration: { Unit: 5, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 5 }, NatureId: 0 },
                { Name: 'consumption', Period: { Duration: { Unit: 6, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 6 }, NatureId: 0 },
                { Name: 'consumption', Period: { Duration: { Unit: 7, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 7 }, NatureId: 0 },
                { Name: 'expression' },
                { Name: 'organization' },
                { Name: 'indexlastvalue' },
                { Name: 'indexlastdate' },
                { Name: 'fullname' }
            ];
            ret.Attributes[3].NatureId = natureId;
            ret.Attributes[4].NatureId = natureId;
            ret.Attributes[5].NatureId = natureId;
            ret.Attributes[6].NatureId = natureId;
        } else {
            ret.Attributes = [];
            for (const period of periods) {
              let attribute;
              switch (period) {
                case 'day':
                  attribute = { Period: { Duration: { Unit: 4, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 4 } };
                  break;
                case 'week':
                  attribute = { Period: { Duration: { Unit: 5, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 5 } };
                  break;
                case 'month':
                  attribute = { Period: { Duration: { Unit: 6, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 6 } };
                  break;
                case 'year':
                  attribute = { Period: { Duration: { Unit: 7, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 7 } };
                  break;
                case 'total':
                  attribute = { };
                  break;
              }
              if (attribute) {
                attribute.Name = 'consumption';
                attribute.NatureId = natureId;
                if (locationId) {
                    attribute.Parameter = 'locationid=' + locationId;
                }
                ret.Attributes.push(attribute);
              }
            }
        }
        return ret;
    }
}

export class JsonAttribValuesEx extends JsonRequest {

    private Ids: number[];
    private Types: number[];

    private Attributes: any[];

    constructor(session: string, ids: number[], types: number[], attributes?: any[]) {
        super(session);
        this.Ids = ids;
        this.Types = types;
    }

    public static Build(session: string, ids: number[], natureId: number, types: number[], periods?: string[], locationId?: number): JsonAttribValuesEx {
        const ret = new JsonAttribValuesEx(session, ids, types);
        if (!periods) {
            ret.Attributes = [
                { Name: 'nature' },
                { Name: 'unit' },
                { Name: 'location' },
                { Name: 'consumption', Period: { Duration: { Unit: 4, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 4 }, NatureId: 0 },
                { Name: 'consumption', Period: { Duration: { Unit: 5, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 5 }, NatureId: 0 },
                { Name: 'consumption', Period: { Duration: { Unit: 6, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 6 }, NatureId: 0 },
                { Name: 'consumption', Period: { Duration: { Unit: 7, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 7 }, NatureId: 0 },
                { Name: 'expression' },
                { Name: 'organization' },
                { Name: 'indexlastvalue' },
                { Name: 'indexlastdate' },
                { Name: 'fullname' }
            ];
            ret.Attributes[3].NatureId = natureId;
            ret.Attributes[4].NatureId = natureId;
            ret.Attributes[5].NatureId = natureId;
            ret.Attributes[6].NatureId = natureId;
        } else {
            ret.Attributes = [];
            for (const period of periods) {
              let attribute;
              switch (period) {
                case 'day':
                  attribute = { Period: { Duration: { Unit: 4, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 4 } };
                  break;
                case 'week':
                  attribute = { Period: { Duration: { Unit: 5, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 5 } };
                  break;
                case 'month':
                  attribute = { Period: { Duration: { Unit: 6, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 6 } };
                  break;
                case 'year':
                  attribute = { Period: { Duration: { Unit: 7, Value: 1 }, Offset: { Unit: 0, Value: 0 }, Start: 7 } };
                  break;
                case 'total':
                  attribute = { };
                  break;
              }
              if (attribute) {
                attribute.Name = 'consumption';
                attribute.NatureId = natureId;
                if (locationId) {
                    attribute.Parameter = 'locationid=' + locationId;
                }
                ret.Attributes.push(attribute);
              }
            }
        }
        return ret;
    }
}

export class JsonAttribValuesConsumption extends JsonRequest {

    private Id: number;
    private Type: number;

    private Attributes: any[] = [{
            Name: 'consumption',
            Period: {},
            NatureId: 0
        }];

    constructor(session: string, id: number, type: number, natureId: number, period: any, parameter?: string) {
        super(session);
        this.Id = id;
        if (type === ThyObjectType.Site) {
            type = ThyObjectType.Location;
        }
        this.Type = type;
        this.Attributes[0].Period = period;
        this.Attributes[0].NatureId = natureId;
        this.Attributes[0].Parameter = parameter;
    }

    public static Build(session: string, id: number, type: number, natureId: number, period: any, locationId?: number): JsonAttribValuesConsumption {
        return new JsonAttribValuesConsumption(session, id, type, natureId, period, locationId !== undefined ? 'locationid=' + locationId : undefined);
    }
}

export class JsonCrossData extends JsonRequest  {
    EndDate = '/Date(1514761199999+0100)/';
    NatureId = null;
    NatureType: 1;
    ObjectId = null;
    Sampling = 4;
    StartDate = '/Date(1483225200000+0100)/';
    Type = null;
    UseActivityPeriod = true;
    UseTemperatureMean = true;

    constructor(session: string, startDate: string, endDate: string, sampleUnit: number, type: number) {
        super(session);
        this.StartDate = startDate;
        this.EndDate = endDate;
        this.Type = type;
    }

    public static Build(session: string, startDate: string, endDate: string, sampleUnit: number, type: number) {
        return new JsonCrossData(session, startDate, endDate, sampleUnit, type);
    }
}

export class JsonTrendDataStream extends JsonRequest  {

    Duration = undefined;
    SampleDuration = undefined;
    EndDate = '/Date(1514761199999+0100)/';
    Filtered = false;
    Function = 0;
    MaxCount = 0;
    TrendId = null;
    StartDate = '/Date(1483225200000+0100)/';
    UseId = false;

    constructor(session: string, trendId: number, startDate: string, endDate: string, duration?: any, sampleDuration?: any) {
        super(session);
        this.TrendId = trendId;
        this.StartDate = startDate;
        this.EndDate = endDate;
        if (duration !== undefined) {
            // this.Duration = duration;
            if (duration.Unit >= 7 ) {
                this.Function = 1;
                this.SampleDuration = { Value: 1, Unit: 4 };
            }
        }
    }

    public static Build(session: string, trendId: number, startDate: Date, endDate: Date, duration?: any, sampleDuration?: any) {
        const newStartDate = startDate ? ThyFormatService.formatDateToMicrosoftStatic(startDate) : null;
        const newEndDate = endDate ? ThyFormatService.formatDateToMicrosoftStatic(endDate) : null;
        return new JsonTrendDataStream(session, trendId, newStartDate, newEndDate, duration, sampleDuration);
    }
}

export class JsonTrendDataStreamByObjectId extends JsonRequest  {

    EndDate = '/Date(-62135596800000+0100)/';
    Filtered = false;
    Function = 0;
    MaxCount = 0;
    TrendId = null;
    ObjectId = null;
    StartDate = '/Date(1483225200000+0100)/';
    UseId: false;
    Duration = {
        Value: undefined,
        Unit: undefined
    };
    SampleDuration = {
        Value: undefined,
        Unit: undefined
    };

    constructor(session: string, trendId: string, startDate: string, endDate: string, duration?: any, sampleDuration?: any) {
        super(session);
        this.ObjectId = trendId;
        this.StartDate = startDate;
        if (endDate) {
            this.EndDate = endDate;
        }
        if (duration) {
            this.Duration.Value = duration.Value;
            this.Duration.Unit = duration.Unit;
        }
        if (sampleDuration) {
            this.SampleDuration.Value = sampleDuration.Value;
            this.SampleDuration.Unit = sampleDuration.Unit;
            this.Function = 1;
        }
    }

    public static Build(session: string, trendId: string, startDate: Date, endDate: Date, duration?: any, sampleDuration?: any) {
        const newStartDate = startDate ? ThyFormatService.formatDateToMicrosoftStatic(startDate) : undefined;
        const newEndDate = endDate ? ThyFormatService.formatDateToMicrosoftStatic(endDate) : undefined;
        return new JsonTrendDataStreamByObjectId(session, trendId, newStartDate, newEndDate, duration, sampleDuration);
    }
}

export class JsonTrendDataStreamById extends JsonRequest  {

    EndDate = '/Date(-62135596800000+0100)/';
    Filtered = false;
    Function = 0;
    MaxCount = 0;
    TrendId = null;
    ObjectId = null;
    StartDate = '/Date(1483225200000+0100)/';
    UseId: false;
    Duration = {
        Value: undefined,
        Unit: undefined
    };

    constructor(session: string, trendId: string, startDate: string, endDate: string, duration?: any, sampleDuration?: any) {
        super(session);
        this.ObjectId = trendId;
        this.StartDate = startDate;
        if (endDate) {
            this.EndDate = endDate;
        }
        if (duration) {
            this.Duration.Value = duration.Value;
            this.Duration.Unit = duration.Unit;
        }
    }

    public static Build(session: string, trendId: string, startDate: Date, endDate: Date, duration?: any, sampleDuration?: any) {
        const newStartDate = startDate ? ThyFormatService.formatDateToMicrosoftStatic(startDate) : undefined;
        const newEndDate = endDate ? ThyFormatService.formatDateToMicrosoftStatic(endDate) : undefined;
        return new JsonTrendDataStreamByObjectId(session, trendId, newStartDate, newEndDate, duration, sampleDuration);
    }
}

interface IPeriods {
    Duration: number;
    PeriodUnit: number;
    Start: string;
}

export class JsonConsumptionData  {

    private EntityIds = [1, 2, 3, 4, 5, 6];
    private EntityType = 0;
    private Extrapolate = false;
    private Periods: IPeriods[] = [
        {
            Duration: 1,
            PeriodUnit: 4,
            Start: '\/Date(1502372984063+0200)\/'
        }, {
            Duration: 1,
            PeriodUnit: 5,
            Start: '\/Date(1502372984063+0200)\/'
        }, {
            Duration: 1,
            PeriodUnit: 6,
            Start: '\/Date(1502372984063+0200)\/'
        }, {
            Duration: 1,
            PeriodUnit: 7,
            Start: '\/Date(1502372984063+0200)\/'
        }, {
            Duration: 1,
            PeriodUnit: 0,
            Start: '\/Date(1502372984063+0200)\/'
        }
    ];
    private ServiceId: number = null;
    private ServiceType: number = null;

    constructor() { }

    public static Build() {
        return new JsonConsumptionData();
    }

}

export class JsonDegreesData extends JsonRequest  {

    private DegreeDayId: number = null;
    private EndDate = '\/Date(1434761199999+0100)/';
    private IncludeReference = false;
    private LocationId: number;
    private SampleDuration = { Value: 0, Unit: 0};
    private StartDate = '\/Date(1483225200000+0100)\/';
    private Type: number;

    constructor(session: string, startDate: string, endDate: string, locationId: number, sampleDuration: any, type: number) {
        super(session);
        this.StartDate = startDate;
        this.EndDate = endDate;
        this.LocationId = locationId;
        this.SampleDuration.Value = sampleDuration.Value;
        this.SampleDuration.Unit = sampleDuration.Unit === 3 ? 4 : sampleDuration.Unit;
        this.Type = type;
    }

    public static Build(session: string, locationId: number, period: ThyPeriodModel, type: number) {
        const newStartDate = ThyFormatService.formatDateToMicrosoftStatic(period.StartDate);
        const newEndDate = ThyFormatService.formatDateToMicrosoftStatic(period.EndDate);
        const sampleDuration = period.SampleDuration;
        return new JsonDegreesData(session, newStartDate, newEndDate, locationId, sampleDuration, type);
    }
}

export class JsonGetConsumption extends JsonRequest {

    public EntityType: number;
    public Entities: string[];
    public ServiceId: number;
    public UseChildren: boolean;
    public ByNature: boolean;
    public Duration: number;
    public PeriodUnit: number;
    public OffsetUnit: number;
    public OffsetDuration: number;
    public StartPeriod: number;

    constructor (session: string, id: string, type: number, period: ThyPeriodModel, useChildren: boolean, natureId?: number, byNature?: boolean) {
        super(session);
        this.Entities = [id];
        this.EntityType = type;
        this.StartPeriod = period.Start;
        this.OffsetUnit = period.Offset ? period.Offset.Unit : undefined;
        this.OffsetDuration = period.Offset ? period.Offset.Value : undefined;
        this.PeriodUnit = period.Duration ? period.Duration.Unit : undefined;
        this.Duration = period.Duration ? period.Duration.Value : undefined;
        this.UseChildren = useChildren;
        this.ServiceId = natureId;
        this.ByNature = byNature;
    }

    // tslint:disable-next-line:max-line-length
    public static Build(session: string, id: string, type: number, period: ThyPeriodModel, useChildren: boolean, natureId?: number, byNature?: boolean): JsonGetConsumption {
        return new JsonGetConsumption(session, id, type, period, useChildren, natureId, byNature);
    }
}

export class JsonConsumptionHistory extends JsonRequest  {

    private ByDegreesDays = false;
    private DontRoundPeriod = false;
    private Duration = { Unit: 7, Value: 1 };
    private EndDate = '\/Date(0)\/'; // '\/Date(-62135596800000+0000)\/';
    private EntityType: number;
    private Id: number;
    private IncludeRef = false;
    private NatureId: number = null;
    private NoNature = false;
    private NoTariff = true;
    private Normalized = false;
    private ObjectId: number = null;
    private Onlyref = false;
    private PerAreaUnit = false;
    private PerPeriod = 0;
    private Reference = null;
    private SampleDuration = {Unit: 6, Value: 1};
    private StartDate = '\/Date(1483225200000+0100)\/';
    private Type = 0;
    private PlanningId: number = null;
    private Parameter: string = null;

    // tslint:disable-next-line:max-line-length
    constructor(session: string, id: number, startDate: string, endDate: string, duration: any, sampleDuration: any, natureId: any, type: number, planningId: any, locationId: any, onlyNature: boolean) {
        super(session);
        this.Id = id;
        if (type === ThyObjectType.Site) { type = ThyObjectType.Location; }
        this.EntityType = type;
        this.NatureId = natureId === '0' || natureId === 0 || natureId === null || natureId === undefined ? null : Number(natureId);
        this.Duration = duration;
        this.SampleDuration = sampleDuration;
        this.StartDate = startDate;
        this.EndDate = endDate;
        this.PlanningId = planningId === '0' || planningId === 0 || planningId === null || planningId === undefined ? null : Number(planningId);
        this.NoNature = onlyNature !== undefined ? onlyNature : false;
        // if (locationId) {
        //     this.Parameter = 'locationid=' + locationId;
        // }
    }

    // tslint:disable-next-line:max-line-length
    public static Build(session: string, id: number, type: number, natureId: any, period: ThyPeriodModel, planningId?: any, locationId?: any, onlyNature?: boolean) {
        let startDate;
        let endDate;
        if (period.StartDate) {
            startDate = ThyFormatService.formatDateToMicrosoftStatic(period.StartDate);
        }
        if (period.EndDate) {
            endDate = ThyFormatService.formatDateToMicrosoftStatic(period.EndDate);
        }
        const duration = period.Duration;
        const sampleDuration = period.SampleDuration;
        return new JsonConsumptionHistory(session, id, startDate, endDate, duration, sampleDuration, natureId, type, planningId, locationId, onlyNature);
    }
}

export class JsonConsumptionHistoryByObjectId extends JsonRequest {

    private ByDegreesDays = false;
    private DontRoundPeriod = false;
    private Duration = { Unit: 7, Value: 1 };
    private EndDate = '\/Date(0)\/'; // '\/Date(-62135596800000+0000)\/';
    private EntityType: number;
    private Id: number;
    private IncludeRef = true;
    private NatureId: number = null;
    private NoNature = true;
    private NoTariff = true;
    private Normalized = false;
    private ObjectId: string = null;
    private Onlyref = false;
    private PerAreaUnit = false;
    private PerPeriod = 0;
    private Reference = null;
    private StartDate = null;
    private Type = 0;

    constructor(session: string, objectId: string, startDate: string, endDate: string, duration: any, sampleDuration: any) {
        super(session);
        this.ObjectId = objectId;
        this.StartDate = startDate;
        this.EndDate = endDate;
        this.Duration = duration;
        // this.SampleDuration = sampleDuration && sampleDuration.Value && sampleDuration.Unit ? sampleDuration : { Value: 1, Unit: 4 };
    }

    // tslint:disable-next-line:max-line-length
    public static Build(session: string, objectId: string, period: any) {
        const newStartDate = ThyFormatService.formatDateToMicrosoftStatic(period.StartDate);
        const newEndDate = period.EndDate ? ThyFormatService.formatDateToMicrosoftStatic(period.EndDate) : ThyFormatService.formatDateToMicrosoftStatic(new Date(-8640000000000000));
        return new JsonConsumptionHistoryByObjectId(session, objectId, newStartDate, newEndDate, period.Duration, period.SampleDuration);
    }

}


/**
 * DASHBOARD SERIALIZATION
 */
export class JsonConsumptionHistoryByRef extends JsonRequest {

    // private ByDegreesDays = false;
    // private DontRoundPeriod = false;
    // private Duration = { Unit: 7, Value: 1 };
    // private EntityType: number;
    // private Id: number;
    // private IncludeRef = true;
    // private NatureId: number = null;
    // private NoNature = false;
    // private NoTariff = true;
    // private Normalized = false;
    // private ObjectId: string = null;
    // private Onlyref = false;
    // private PerAreaUnit = false;
    // private PerPeriod = 0;
    private Reference = undefined;
    private StartDate = undefined;
    private EndDate = undefined;
    // private SampleDuration = {Unit: 6, Value: 1};
    // private Type = 0;

    constructor(session: string, startDate: string, endDate: string, reference: string) {
        super(session);
        this.Reference = reference;
        this.StartDate = startDate;
        this.EndDate = endDate;
    }

    // tslint:disable-next-line:max-line-length
    public static Build(session: string, startDate: Date, endDate: Date, reference: string) {
        const newStartDate = ThyFormatService.formatDateToMicrosoftStatic(startDate);
        const newEndDate = ThyFormatService.formatDateToMicrosoftStatic(endDate);
        return new JsonConsumptionHistoryByRef(session, newStartDate, newEndDate, reference);
    }
}

export class JsonSubscribePoint extends JsonRequest {

    public Name: string;
    public Duration: number;
    public OffsetDuration: number;
    public OffsetUnit: number;
    public StartPeriod: number;
    public PeriodUnit: number;

    constructor (session: string, ref: string) {
        super(session);
        this.Name = ref;
        this.Duration = 0;
        this.OffsetDuration = 0;
        this.OffsetUnit = null;
        this.StartPeriod = null;
        this.PeriodUnit = null;
    }

    public static Build(session: string, ref: string) {
        return new JsonSubscribePoint(session, ref);
    }
}

export class JsonUnsubscribePoint extends JsonRequest  {

    public SubscriptionId: string;

    constructor (session: string, ref: string) {
        super(session);
        this.SubscriptionId = ref;
    }

    public static Build(session: string, ref: string) {
        return new JsonUnsubscribePoint(session, ref);
    }
}

export class JsonSubscribeEvents {

    public SessionKey: string;
    public Events = [
        'EntityChanged',
        'MessageStateChanged',
    ];

    constructor(session: string) {
        this.SessionKey = session;
    }

    public static Build(session: string) {
        return new JsonSubscribeEvents(session);
    }

}

export class JsonNotifications extends JsonRequest {

    public Timeout: number;

    constructor(session: string, timeout: number) {
        super(session);
        this.Timeout = Number(FormatService.numberFormat(timeout, '0')) ? timeout : 30;
    }

    public static Build(session: string, timeout: number) {
        return new JsonNotifications(session, timeout);
    }
}


