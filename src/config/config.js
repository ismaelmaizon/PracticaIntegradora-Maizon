import dotenv from 'dotenv';
import { Command } from 'commander';

export const proceso = () => {
    const command = new Command();
    
    command.option('--mode <mode> ', 'modo en que se levantara la app', 'dev')//'env'
    command.parse();
    
    
    
    const mode = command.opts().mode;
    dotenv.config({
        path: mode == 'env' ? '\.env.development' : '\.env.production'
    });
    
    console.log(process.env.PORT, process.env.DB_URL, process.env.USERNAME);
    console.log(command.opts())
}


