import { TracingProcessor } from '@openai/agents';
import { promises as fs } from 'fs';
import path from 'path';

const TRACES_DIR = path.resolve(process.cwd(), 'traces');

async function ensureDir(): Promise<void> {
	await fs.mkdir(TRACES_DIR, { recursive: true });
}

const LocalFileTracingProcessor: TracingProcessor = {
	start() {
		void ensureDir();
	},

	async onTraceStart(_trace) {},

	async onTraceEnd(trace) {
		await ensureDir();
		const file = path.join(TRACES_DIR, `${trace.traceId}.json`);
		await fs.writeFile(file, JSON.stringify(trace, null, 2), 'utf-8');
	},

	async onSpanStart(_span) {},

	async onSpanEnd(span) {
		await ensureDir();
		const line = JSON.stringify(span) + '\n';
		await fs.appendFile(
			path.join(TRACES_DIR, 'spans.ndjson'),
			line,
			'utf-8',
		);
	},

	async forceFlush() {},

	async shutdown(_timeout) {},
};

export default LocalFileTracingProcessor;
