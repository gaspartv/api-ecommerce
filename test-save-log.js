// Teste rápido para verificar se SaveLog funciona
const { SaveLog } = require("./dist/utils/save-log.util");

async function testSaveLog() {
  try {
    console.log("Testando SaveLog...");

    const testMessage = JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "info",
      message: "Test log message",
      data: { userId: 123, action: "login" },
    });

    const result = await SaveLog.execute(testMessage, "test-log");
    console.log("Resultado:", result ? "SUCESSO" : "FALHA");
  } catch (error) {
    console.error("Erro no teste:", error);
  }
}

testSaveLog();
