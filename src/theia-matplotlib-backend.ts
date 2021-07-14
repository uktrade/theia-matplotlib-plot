import * as theia from '@theia/plugin';
import * as child_process from "child_process";


const log = theia.window.createOutputChannel("debug");


export function start() {
    const informationMessageTestCommand = {
        id: 'theia-matplotlib.generateImage',
        label: "Generate image with matplotlib"
    };

    theia.commands.registerCommand(informationMessageTestCommand, (...args: any[]) => {
        const activeEditor = theia.window.activeTextEditor;
        let filePath = activeEditor? activeEditor.document.uri.path : "";

        theia.window.showInformationMessage('Generating!');

        // https://nodejs.org/dist/latest-v11.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options
        let parameters = [filePath];
        const spawnOptions = { env: {...process.env, MPLBACKEND: 'module://matplotlib_imagebackend', MATPLOTLIB_IMAGEBACKEND_DIR: '/home/project/theia-matplotlib/output'}}
        let python = child_process.spawn("python3", parameters, spawnOptions);

        python.stdout.on("data", (data) => {
            log.appendLine("stdout - data");

            let text = data.toString();
            log.appendLine(text);
            log.show();
        });

        python.stderr.on("data", (data) => {
            log.appendLine("stderr - data");

            let text = data.toString();
            log.appendLine(text);
            log.show();
        });

        python.stderr.on("error", (data) => {
            log.appendLine("stderr - error");

            let text = data.toString();
            log.appendLine(text);
            log.show();
        });
    });
}

export function stop() {

}
