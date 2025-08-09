import { Logger } from "@nestjs/common";
import { promises as fs } from "fs";
import { join } from "path";

export class SaveLog {
  static async execute(message: string, name: string): Promise<boolean> {
    try {
      const createdAt = new Date();
      const dateToString = createdAt.getTime().toString();
      const sanitizedName = name.replace(/[^a-zA-Z0-9_-]/g, "_");
      const logsDir = join(
        process.cwd(),
        "logs",
        `${createdAt.toLocaleDateString("pt-BR").replace(/\//g, "-")}`,
      );
      const filePath = join(logsDir, `${dateToString}-${sanitizedName}.log`);
      await fs.mkdir(logsDir, { recursive: true });
      await fs.writeFile(filePath, message, "utf8");
      Logger.log(filePath, "SaveLog");
      return true;
    } catch (error) {
      Logger.error(error.message, "SaveLog");
      return false;
    }
  }
}
