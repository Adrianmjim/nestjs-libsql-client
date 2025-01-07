export function getLibSqlClientId(clientName?: string): string {
  return clientName !== undefined ? `lib_sql_client_${clientName}` : 'lib_sql_client';
}
