import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

export const dynamic = 'force-dynamic';

// Lazily initialise so that missing GitHub OAuth env vars don't
// crash the build — the handler is only needed at runtime.
let _handler: ReturnType<typeof makeRouteHandler> | null = null;
function getHandler() {
  if (!_handler) _handler = makeRouteHandler({ config });
  return _handler;
}

export function GET(req: Request) {
  return getHandler().GET!(req);
}

export function POST(req: Request) {
  return getHandler().POST!(req);
}
