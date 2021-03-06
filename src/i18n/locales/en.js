export default {
  announcement: 'Announcement: According to opinions from majority, we decided to close this project at Oct 18 00:00:00 CST. Celebrity owners will devide the pot according to the bid price at that moment. If you have questions or is against to this move, please join our Telegram group (see About page) to discuss.',
  EOSCelebrity: 'Fund disk',
  nav_switch_lang: 'Language',
  nav_switch_lang_en: 'ENGLISH',
  nav_switch_lang_zh: 'CHINESE',
  nav_switch_lang_jp: 'JAPANESE',
  nav_celeb_list: 'hero List',
  nav_leaderboard: 'Leaderboard',
  nav_about: 'About',
  nav_sign_in: 'Sign In',
  nav_sign_in_scatter: 'Sign In After Downloading Scatter',
  nav_invite: 'Invite',
  nav_sign_out: 'Sign Out',
  info_pot: 'Pot',
  info_count_down: 'Close Count Down',
  info_count_down_end: 'Closed',
  will_open_before: 'The Game Open Count Down ',
  will_open_after: '',
  info_new_celeb_count_down: 'New Item Count Down',
  info_last_buyer: 'Last Buyer',
  info_order_by: 'Sort',
  info_order_by_asc: 'Price Descending',
  info_order_by_desc: 'Price Ascending',
  info_filter: 'Filter',
  info_filter_none: 'All Heros',
  info_filter_buy: 'Heros Owned',
  info_filter_not_buy: 'Heros Not Owned',
  card_owner: 'Owner',
  card_buy_after_login: 'Purchase after login',
  card_buy: 'Purchase',
  card_edit_slogan: 'Edit Slogan',
  buy_modal_title: 'Purchase',
  buy_modal_label: 'Price',
  buy_modal_pay: 'Pay via Scatter',
  buy_modal_cancel: 'Cancel',
  buy_modal_msg_success: 'You purchased {buyTarget} successfully with {priceReadable}.',
  buy_modal_msg_cancel: 'You cancelled purchase of {buyTarget} in Scatter.',
  buy_modal_msg_fail_title: 'Purchase Failed',
  buy_modal_msg_fail_body: 'Sorry, failed to purchase {buyTarget} with {priceReadable}: <br>{content}',
  buy_modal_msg_fail_body1: 'Sorry, the price is wrong, please refresh and try again!',
  buy_modal_msg_fail_overdrawn: 'Insufficient balance',
  buy_modal_msg_fail_no_enough: 'Some one has already purchased it',
  buy_modal_msg_fail_time: 'Purchase stage not started or is closed',
  buy_modal_msg_fail_celeb_not_exist: 'Hero does not exist or not open for purchase',
  invite_modal_title: 'Invite Friend and Get Bonus',
  invite_modal_label: 'Invitation URL',
  invite_modal_copy: 'Copy',
  invite_modal_close: 'Close',
  invite_modal_copy_success: 'Invitiation URL copied to clipboard',
  invite_modal_copy_fail: 'Copy invitation URL failed. Please copy manually.',
  edit_slogan_modal_title: 'Edit Slogan',
  edit_slogan_modal_label: 'Slogan (Maximum 64 characters)',
  edit_slogan_modal_save: 'Save Slogan',
  edit_slogan_modal_cancel: 'Cancel',
  edit_slogan_modal_msg_success: 'Successfully edited slogan for {sloganTarget}!',
  edit_slogan_modal_msg_cancel: 'You cancelled slogan edit for {sloganTarget}.',
  edit_slogan_modal_msg_fail_title: 'Failed',
  edit_slogan_modal_msg_fail_body: 'Failed to set slogan for {sloganTarget}:<br>Unknown Error:<br>{content}',
  leaderboard_label_rank: 'Rank',
  leaderboard_label_name: 'Name',
  leaderboard_label_total_value: 'Asset Value',
  leaderboard_label_celeb_count: 'Owned Heros',
  leaderboard_label_celeb_top: 'Most Valued 5 Heros',
  about_content: `
  <h2>The game is very risky, please see the rules! </h2>
  <h2>Pricing Description</h2>
  <p>The initial price per celebrity is 0.1 EOS</p>
  <p>The next price is: the previous price *1.35.</p>
  <p>35% of premium is allocated according to the following ratio</p>
  <ul>
    <li>The previous person took 89%</li>
    <li>Pot 10%</li>
    <li>Team 1% (ram fee and maintenance fee)</li>
  </ul>
  <h2>For example:</h2>
  <p>The current price for Trump is 10 EOS</p>
  <p>I need to trade with 10*1.35=13.5 EOS</p>
  <p>10 EOS are paied to the previous buyer</p>
  <ul>
    <li>The remaining 10*0.35=3.5 EOS will be allocated according to the ratio</li>
    <li>Previous buyer takes 3.5*89%=3.115 EOS</li>
    <li>Pot pool takes 3.5*10%=0.35 EOS</li>
    <li>The team takes 3.5*0.1%=0.035 EOS</li>
  </ul>

  <h2>fomo</h2>
  <p>Fomo time is set to 10 minutes </p>
  <p>Reset to 10 minutes each time someone buys</p>

  <h2>Compensation loss</h2>
  <p>After the end of the first set</p>
  <p>Subsequent distribution of a certain token based on the amount of the hero (the grand prize winner does not)</p>
  <p>The second set will give 10% of the money to the previous token holder .</p>

  <h2>Preventing robots</h2>
  <p>Every time memo uses a new rule (the contract is open source 1 hour after the game starts,)</p>
  <p>If the wrong memo goes in, the money will not be refunded, and this money will be allocated to the hero holder.</p>
  `
}