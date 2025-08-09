import * as runtime from "@prisma/client/runtime/library";
import { PrismaClient } from "generated/prisma";

type PrismaTransaction = Omit<PrismaClient, runtime.ITXClientDenyList>;

export type PrismaClientTransaction = PrismaTransaction | PrismaClient;
