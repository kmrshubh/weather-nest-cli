import { Command, CommandRunner, Option } from 'nest-commander';
import axios from 'axios';

@Command({ name: 'weather' })
export class WeatherService extends CommandRunner {
  async run(
    passedParam: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const location = options?.string || 'India';
    await this.getWeather(location);
  }

  @Option({
    flags: '-l, --location [location]',
    description: 'A string return',
  })
  async getWeather(location: string): Promise<void> {
    try {
      console.log('Fetching Weather....');
      const response = await axios.get(`https://wttr.in/${location}?format=3`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}
