import cuid from "cuid";
import { env } from "src/configs/env.config";

interface SessionDto {
  id: string;
  loginAt: Date;
  expiredAt: Date;
  revokedAt: Date | null;
  ipAddress: string | null;
  userAgent: string | null;
  idUser?: string | null;
  idClient?: string | null;
}

interface SessionCreateDto {
  ipAddress: string;
  userAgent: string;
  idUser?: string | null;
  idClient?: string | null;
}

export class SessionEntity {
  private _id: string;
  private _loginAt: Date;
  private _expiredAt: Date;
  private _revokedAt: Date | null;
  private _ipAddress: string | null;
  private _userAgent: string | null;
  private _idUser: string | null;
  private _idClient: string | null;

  constructor(session?: SessionDto) {
    if (session) this.fill(session);
  }

  fill(session: SessionDto) {
    this._id = session.id;
    this._loginAt = session.loginAt;
    this._expiredAt = session.expiredAt;
    this._revokedAt = session.revokedAt;
    this._ipAddress = session.ipAddress;
    this._userAgent = session.userAgent;
    this._idUser = session.idUser ?? null;
    this._idClient = session.idClient ?? null;
  }

  create(session: SessionCreateDto) {
    this._id = cuid();
    this._loginAt = new Date();
    this._expiredAt = new Date(new Date().getTime() + Number(env.JWT_EXPIRES_IN_TIME));
    this._revokedAt = null;
    this._ipAddress = session.ipAddress;
    this._userAgent = session.userAgent;
    this._idUser = session.idUser ?? null;
    this._idClient = session.idClient ?? null;
  }

  revoke() {
    this._revokedAt = new Date();
  }

  getSessionData(): SessionDto {
    return {
      id: this._id,
      loginAt: this._loginAt,
      expiredAt: this._expiredAt,
      revokedAt: this._revokedAt,
      ipAddress: this._ipAddress,
      userAgent: this._userAgent,
      idUser: this._idUser,
      idClient: this._idClient,
    };
  }

  get expiredAt(): Date {
    return this._expiredAt;
  }
}
