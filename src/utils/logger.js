import chalk from 'chalk'

const logger = {
  error: (err) => {
    // eslint-disable-next-line no-console
    console.log(err)
    // eslint-disable-next-line no-console
    console.log(chalk.red(err))
  },

  info: (msg) => {
    // eslint-disable-next-line no-console
    console.info(chalk.green(msg))
  },

  warning: (msg) => {
    // eslint-disable-next-line no-console
    console.warn(chalk.yellow(msg))
  },

  appStarted: (port, host) => {
    // eslint-disable-next-line no-console
    console.log(`Server started on http://${host}:${port} ${chalk.green('✓')}`)

    // eslint-disable-next-line no-console
    console.log(`
          ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
        `)
  },
}

export default logger