window.VLDC_CHAPTERS = window.VLDC_CHAPTERS || [];
window.VLDC_CHAPTERS.push({
  "id": "ch05",
  "number": 5,
  "short": "Quang học",
  "title": "Quang học",
  "glossary": [
    {
      "k": "$i,i'$",
      "mean": "góc tới, góc phản xạ",
      "unit": "rad hoặc độ",
      "note": "$i'=i$; đổi rad khi dùng $\\sin$ mode rad"
    },
    {
      "k": "$r$",
      "mean": "góc khúc xạ",
      "unit": "—",
      "note": "$n_1\\sin i=n_2\\sin r$"
    },
    {
      "k": "$n$",
      "mean": "chiết suất",
      "unit": "—",
      "note": "n = c/v pha; trong các điện môi trong suốt thông thường ở vùng khả kiến, thường n > 1. Không phải bất đẳng thức tổng quát cho mọi tần số/vật liệu."
    },
    {
      "k": "$L$",
      "mean": "quang lộ",
      "unit": "m",
      "note": "Môi trường đồng nhất: $L=nd$; tổng quát $L=\\int n\\,ds$. Đây là định nghĩa quang lộ."
    },
    {
      "k": "$\\delta$",
      "mean": "hiệu quang lộ",
      "unit": "m",
      "note": "I-âng: $\\delta=ax/D$"
    },
    {
      "k": "$i_{\\mathrm{vân}}$",
      "mean": "khoảng vân",
      "unit": "m",
      "note": "$i=\\lambda D/a$"
    },
    {
      "k": "$\\alpha$",
      "mean": "góc nêm / góc polarizer",
      "unit": "rad",
      "note": "Malus phân cực: $I=I_0\\cos^2\\alpha$"
    }
  ],
  "formulas": [
    {
      "name": "Truyền thẳng, phản xạ, khúc xạ",
      "latex": "$$i'=i,\\quad n_1\\sin i=n_2\\sin r$$",
      "symbols": "",
      "sym": [
        {
          "k": "$i$",
          "mean": "góc tới (với pháp tuyến)",
          "unit": "—"
        },
        {
          "k": "$n$",
          "mean": "chiết suất",
          "unit": "—"
        }
      ],
      "when": "Mặt nhẵn. Tia tới, pháp tuyến, phản xạ/khúc xạ đồng phẳng."
    },
    {
      "name": "Phản xạ toàn phần",
      "latex": "$$\\sin i_{gh}=\\dfrac{n_2}{n_1}\\quad (n_1>n_2,\\ i>i_{gh})$$",
      "symbols": "",
      "sym": [
        {
          "k": "$i_{gh}$",
          "mean": "góc giới hạn",
          "unit": "—"
        }
      ],
      "when": "Từ môi trường chiết suất lớn sang nhỏ. Sợi quang, ống nhòm/kính tiềm vọng (gương hoặc TIR)."
    },
    {
      "name": "Maxwell: ánh sáng là sóng EM",
      "latex": "$$c=\\dfrac{1}{\\sqrt{\\varepsilon_0\\mu_0}},\\quad \\lambda_0\\approx 0{,}40\\text{–}0{,}76\\ \\mu\\mathrm{m}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\lambda_0$",
          "mean": "bước sóng chân không (nhìn thấy)",
          "unit": "m"
        }
      ],
      "when": "Quang học sóng. Trong môi trường $v=c/n$."
    },
    {
      "name": "Quang lộ",
      "latex": "$$L=n\\,d$$",
      "symbols": "",
      "sym": [
        {
          "k": "$L$",
          "mean": "quang lộ",
          "unit": "m"
        }
      ],
      "when": "Môi trường đồng nhất: $L=nd$; n biến thiên: $L=\\int n\\,ds$. Quang lộ khác chiều dài hình học."
    },
    {
      "name": "Hai khe I-âng (Young)",
      "latex": "$$y_k=k\\dfrac{\\lambda D}{a},\\quad i=\\dfrac{\\lambda D}{a}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$a$",
          "mean": "khoảng cách hai khe",
          "unit": "m"
        },
        {
          "k": "$D$",
          "mean": "khe–màn",
          "unit": "m"
        },
        {
          "k": "$k$",
          "mean": "bậc vân",
          "unit": "—"
        }
      ],
      "when": "Hai khe kết hợp cùng pha, cùng phân cực; góc nhỏ và D lớn so với a. Nếu dùng hiệu quang lộ, cực đại có $\\delta=k\\lambda_0$ với bước sóng chân không; trong cùng môi trường, hiệu đường đi bằng k lần bước sóng môi trường."
    },
    {
      "name": "Nêm & vân Newton",
      "latex": "$$\\Delta x\\approx\\dfrac{\\lambda_0}{2n\\alpha},\\qquad r_k^2\\approx k\\lambda_0R\\quad\\text{(Newton: vân tối phản xạ, khe không khí)}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\alpha$",
          "mean": "góc nêm",
          "unit": "rad"
        }
      ],
      "when": "Góc nêm nhỏ, chiếu gần vuông góc; khoảng vân giữa hai vân cùng loại. Newton: tiếp xúc lý tưởng, r nhỏ so với R; vân sáng phản xạ dùng bậc nửa nguyên."
    },
    {
      "name": "Định luật Malus về phân cực",
      "latex": "$$I=I_0\\cos^2\\alpha$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\alpha$",
          "mean": "góc hai trục polarizer",
          "unit": "—"
        }
      ],
      "when": "Ánh sáng tới bản phân tích đã phân cực thẳng, I₀ là cường độ ngay trước bản đó; α là góc phương phân cực với trục truyền. Ánh sáng tự nhiên qua bản phân cực lý tưởng thứ nhất còn I tự nhiên / 2."
    }
  ],
  "traps": [
    {
      "title": "Góc với pháp tuyến",
      "text": " Không nhầm góc với mặt phân cách."
    },
    {
      "title": "TIR chiều",
      "text": " Chỉ từ $n$ lớn $\\to$ $n$ nhỏ. Nước $\\to$ không khí được; ngược lại không TIR."
    },
    {
      "title": "I-âng: $a$ vs $D$",
      "text": " $i=\\lambda D/a$: $a$ nhỏ $\\Rightarrow$ vân thưa. Đổi SI (mm, nm)."
    },
    {
      "title": "Quang lộ và định luật Malus",
      "text": " $L=nd$ là quang lộ trong môi trường đồng nhất. $I=I_0\\cos^2\\alpha$ là định luật Malus cho cường độ qua bản phân tích; không dùng L = nd để tính cường độ."
    }
  ],
  "visual": {
    "html": "<p><strong>Ống nhòm / kính tiềm vọng (DCCT).</strong> Gương $45^\\circ$ hoặc lăng kính TIR: tia vào–ra song song, dịch trục. Ống nhòm: hai ống + lăng kính đảo ảnh.</p><p><strong>I-âng.</strong> Hai khe $S_1S_2=a$, màn $D$. Vân giữa $k=0$ sáng (hiệu lộ $0$).</p><p><strong>Sợi quang.</strong> TIR liên tiếp trong lõi $n$ lớn, vỏ $n$ nhỏ.</p>"
  },
  "mcq": [
    {
      "level": "NB",
      "stem": "Định luật truyền thẳng giải thích",
      "choices": {
        "A": "vùng tối nhật thực / bóng",
        "B": "cầu vồng chỉ",
        "C": "quang điện",
        "D": "O-G"
      },
      "answer": "A",
      "whyCorrect": "Bài giảng + sách BT: bóng, nhật/nguyệt thực.",
      "whyWrong": {
        "B": "Khúc xạ/tán sắc.",
        "C": "Module 6.",
        "D": "Điện."
      }
    },
    {
      "level": "NB",
      "stem": "Phản xạ: góc phản xạ so với góc tới",
      "choices": {
        "A": "bằng nhau ($i'=i$)",
        "B": "luôn $90^\\circ$",
        "C": "$i'=2i$",
        "D": "không đồng phẳng"
      },
      "answer": "A",
      "whyCorrect": "Định luật phản xạ. Đồng phẳng với pháp tuyến.",
      "whyWrong": {
        "B": "Chỉ trường hợp đặc biệt.",
        "C": "Sai.",
        "D": "Phải đồng phẳng."
      }
    },
    {
      "level": "TH",
      "stem": "Từ không khí vào thủy tinh $n=1{,}5$, với $0<i<90^\\circ$. Theo Snell, khi i tăng thì góc khúc xạ r",
      "choices": {
        "A": "tăng nhưng $r<i$",
        "B": "$r>i$",
        "C": "$r=i$ mọi $i$",
        "D": "TIR ngay từ không khí"
      },
      "answer": "A",
      "whyCorrect": "$n_2>n_1\\Rightarrow r<i$. TIR không xảy ra khi vào môi trường $n$ lớn.",
      "whyWrong": {
        "B": "Ngược.",
        "C": "Ở đây n₁ ≠ n₂ và i > 0 nên r < i; r = i cũng có ở tới vuông góc i = 0, nhưng ngoài phạm vi đề này.",
        "D": "Sai chiều."
      }
    },
    {
      "level": "TH",
      "stem": "Phản xạ toàn phần xảy ra khi",
      "choices": {
        "A": "$n_1>n_2$ và $i>i_{gh}$",
        "B": "$n_1<n_2$ mọi $i$",
        "C": "chỉ kim loại",
        "D": "$i=0$"
      },
      "answer": "A",
      "whyCorrect": "$\\sin i_{gh}=n_2/n_1$. Sợi quang, lăng kính ống nhòm.",
      "whyWrong": {
        "B": "Không TIR.",
        "C": "Điện môi trong suốt cũng được.",
        "D": "Pháp tuyến, không TIR."
      }
    },
    {
      "level": "NB",
      "stem": "Maxwell về ánh sáng",
      "choices": {
        "A": "ánh sáng là sóng điện từ",
        "B": "ánh sáng là dòng proton",
        "C": "không liên quan $E,B$",
        "D": "chỉ hạt, cấm sóng"
      },
      "answer": "A",
      "whyCorrect": "Thuyết điện từ 5.2.1. Lượng tử bổ sung module 6.",
      "whyWrong": {
        "B": "Sai.",
        "C": "Sóng EM gồm $E,B$.",
        "D": "Lưỡng tính."
      }
    },
    {
      "level": "TH",
      "stem": "Quang lộ của đoạn dài d trong môi trường đồng nhất có chiết suất n là",
      "choices": {
        "A": "$L=n d$",
        "B": "$L=d/n$",
        "C": "$L=\\lambda/n$ mọi lúc gọi quang lộ đoạn $d$",
        "D": "L = d với mọi chiết suất n"
      },
      "answer": "A",
      "whyCorrect": "Bài giảng: $L=n\\cdot d$.",
      "whyWrong": {
        "B": "Đảo.",
        "C": "Đó gần bước sóng môi trường.",
        "D": "L = d chỉ khi n = 1; tổng quát L = nd. Trong môi trường đồng nhất, L cũng bằng c nhân thời gian truyền pha d/v."
      }
    },
    {
      "level": "TH",
      "stem": "Huygens–Fresnel",
      "choices": {
        "A": "mỗi điểm mặt sóng là nguồn sóng cầu; giao thoa các sóng thứ cấp",
        "B": "tia luôn cong trong chân không",
        "C": "cấm nhiễu xạ",
        "D": "chỉ phản xạ kim loại"
      },
      "answer": "A",
      "whyCorrect": "Cơ sở sóng: giao thoa, nhiễu xạ.",
      "whyWrong": {
        "B": "Chân không thẳng (hình học).",
        "C": "Giải thích nhiễu xạ.",
        "D": "Không."
      }
    },
    {
      "level": "VD",
      "stem": "I-âng: $\\lambda=600$ nm, $a=0{,}30$ mm, $D=1{,}5$ m. Khoảng vân $i=\\lambda D/a$",
      "choices": {
        "A": "$3{,}0$ mm",
        "B": "$0{,}30$ mm",
        "C": "$3{,}0$ m",
        "D": "$1{,}2$ mm"
      },
      "answer": "A",
      "whyCorrect": "$i=600\\times 10^{-9}\\cdot 1{,}5/(3{,}0\\times 10^{-4})=3{,}0\\times 10^{-3}$ m.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}0$ mm.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}0$ mm.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}0$ mm."
      }
    },
    {
      "level": "TH",
      "stem": "Hai khe Young cùng pha, cùng phân cực. Điều kiện vân sáng theo hiệu quang lộ δ, với $\\lambda_0$ là bước sóng chân không, là",
      "choices": {
        "A": "$\\delta=k\\lambda_0$, k nguyên",
        "B": "$\\delta=(k+1/2)\\lambda_0$",
        "C": "hai khe không kết hợp",
        "D": "$a=0$"
      },
      "answer": "A",
      "whyCorrect": "Hiệu pha $2\\pi\\delta/\\lambda_0=2k\\pi$ cho giao thoa tăng cường. Hai khe đã cùng pha nên không có độ lệch pha ban đầu bổ sung.",
      "whyWrong": {
        "B": "Vân tối.",
        "C": "Không vân bền.",
        "D": "Một khe."
      }
    },
    {
      "level": "TH",
      "stem": "Bản mỏng hình nêm cho",
      "choices": {
        "A": "vân thẳng song song cạnh nêm",
        "B": "chỉ vân Newton tròn",
        "C": "không giao thoa",
        "D": "TIR bắt buộc"
      },
      "answer": "A",
      "whyCorrect": "Nội dung 5.3.3. Newton mới là vân tròn.",
      "whyWrong": {
        "B": "Newton: khe không khí cầu–phẳng.",
        "C": "Có.",
        "D": "Không bắt buộc."
      }
    },
    {
      "level": "TH",
      "stem": "Vân tròn Newton",
      "choices": {
        "A": "giao thoa khe không khí giữa thấu kính và tấm phẳng",
        "B": "hai khe Young",
        "C": "tán sắc lăng kính",
        "D": "quang điện"
      },
      "answer": "A",
      "whyCorrect": "5.3.4. Bán kính vân $\\propto\\sqrt{k}$.",
      "whyWrong": {
        "B": "Vân thẳng.",
        "C": "Quang hình.",
        "D": "Module 6."
      }
    },
    {
      "level": "TH",
      "stem": "Nhiễu xạ khác giao thoa I-âng ở chỗ",
      "choices": {
        "A": "sóng bị lệch khi gặp khe/vật chắn, kể cả một khe",
        "B": "cần đúng hai khe",
        "C": "không phải sóng",
        "D": "chỉ hạt"
      },
      "answer": "A",
      "whyCorrect": "Huygens: khe hẹp, cách tử. Giao thoa là chồng hai (nhiều) nguồn kết hợp.",
      "whyWrong": {
        "B": "Một khe vẫn nhiễu xạ.",
        "C": "Là sóng.",
        "D": "Mô hình sóng."
      }
    },
    {
      "level": "NB",
      "stem": "Ánh sáng tự nhiên vs phân cực",
      "choices": {
        "A": "tự nhiên: $\\vec{E}$ mọi phương vuông góc tia; Polaroid chọn một phương",
        "B": "tự nhiên đã là polarizer hoàn hảo",
        "C": "phân cực nghĩa là $n<1$",
        "D": "không có $\\vec{E}$"
      },
      "answer": "A",
      "whyCorrect": "5.4.2–5.4.3.",
      "whyWrong": {
        "B": "Ngược.",
        "C": "Sai.",
        "D": "Sóng EM có $E$."
      }
    },
    {
      "level": "TH",
      "stem": "Ánh sáng phân cực thẳng cường độ I₀ tới bản phân tích lý tưởng; phương phân cực hợp trục truyền góc α. Định luật Malus cho cường độ ra là",
      "choices": {
        "A": "$I=I_0\\cos^2\\alpha$",
        "B": "$I=I_0\\cos\\alpha$",
        "C": "$I=I_0/\\alpha$",
        "D": "$L=nd$"
      },
      "answer": "A",
      "whyCorrect": "Biên độ điện trường truyền qua bằng biên độ tới nhân $\\cos\\alpha$; cường độ tỉ lệ bình phương biên độ nên $I=I_0\\cos^2\\alpha$.",
      "whyWrong": {
        "B": "Thiếu bình phương.",
        "C": "Sai.",
        "D": "L = nd là định nghĩa quang lộ, không phải công thức cường độ qua bản phân tích."
      }
    },
    {
      "level": "VD",
      "stem": "Ánh sáng ngay sau Polaroid thứ nhất có cường độ $I_0$ và phân cực theo trục của nó. Polaroid thứ hai lý tưởng lệch trục $60^\\circ$. Cường độ ra là",
      "choices": {
        "A": "$I_0/4$",
        "B": "$I_0/2$",
        "C": "$I_0$",
        "D": "$0$"
      },
      "answer": "A",
      "whyCorrect": "$\\cos 60^\\circ=1/2$, $\\cos^2=1/4$.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $I_0/4$.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $I_0/4$.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $I_0/4$."
      }
    },
    {
      "level": "VDC",
      "stem": "Kính tiềm vọng / ống nhòm (sản phẩm DCCT) dựa trên",
      "choices": {
        "A": "phản xạ gương $45^\\circ$ hoặc TIR lăng kính, tia dịch trục",
        "B": "Young hai khe trong ống",
        "C": "quang điện",
        "D": "ống dây $B$"
      },
      "answer": "A",
      "whyCorrect": "Hai gương song song $45^\\circ$: nhìn từ hào. Ống nhòm: lăng kính Porro đảo ảnh.",
      "whyWrong": {
        "B": "Sản phẩm 2 DCCT là I-âng, khác ống nhòm.",
        "C": "Sai.",
        "D": "Sai."
      }
    },
    {
      "level": "VDC",
      "stem": "Sợi quang dẫn sáng vì",
      "choices": {
        "A": "TIR trong lõi $n$ lớn, vỏ $n$ nhỏ",
        "B": "kim loại đặc ruột",
        "C": "dòng điện trong thủy tinh",
        "D": "Wien"
      },
      "answer": "A",
      "whyCorrect": "Ứng dụng phản xạ toàn phần. CNTT: truyền tín hiệu.",
      "whyWrong": {
        "B": "Đó là dây đồng.",
        "C": "Dielectric.",
        "D": "Nhiệt."
      }
    },
    {
      "level": "TH",
      "stem": "Nguồn kết hợp I-âng cần",
      "choices": {
        "A": "cùng $f$, hiệu pha không trôi theo thời gian",
        "B": "hai đèn độc lập bất kỳ",
        "C": "một khe chỉ",
        "D": "$\\lambda$ khác nhau nhiều"
      },
      "answer": "A",
      "whyCorrect": "5.3.1–5.3.2. Hai khe từ một nguồn $S$.",
      "whyWrong": {
        "B": "Không kết hợp.",
        "C": "Nhiễu xạ một khe, không hai nguồn.",
        "D": "Vân màu/trắng phức tạp."
      }
    },
    {
      "level": "VD",
      "stem": "Tăng $a$ (hai khe) gấp đôi, $D,\\lambda$ giữ. Khoảng vân",
      "choices": {
        "A": "giảm nửa",
        "B": "gấp đôi",
        "C": "không đổi",
        "D": "gấp bốn"
      },
      "answer": "A",
      "whyCorrect": "$i\\propto 1/a$.",
      "whyWrong": {
        "B": "Đảo.",
        "C": "Sai.",
        "D": "Nhầm $a^2$."
      }
    },
    {
      "level": "NB",
      "stem": "Góc trong $\\sin i$ khi máy tính mode rad",
      "choices": {
        "A": "phải đổi độ $\\to$ rad",
        "B": "độ và rad như nhau",
        "C": "luôn $0$",
        "D": "không dùng $\\sin$"
      },
      "answer": "A",
      "whyCorrect": "SI radian. Đề thường cho độ — đổi $\\pi/180$.",
      "whyWrong": {
        "B": "Sai số.",
        "C": "Sai.",
        "D": "Có dùng."
      }
    },
    {
      "level": "TH",
      "stem": "Cách tử truyền qua có chu kỳ a, chiếu sáng đơn sắc vuông góc; λ là bước sóng trong môi trường quan sát. Cực đại chính thỏa",
      "choices": {
        "A": "nhiều khe: cực đại $a\\sin\\theta=k\\lambda$",
        "B": "cấm nhiễu xạ",
        "C": "chỉ phản xạ gương",
        "D": "O-G"
      },
      "answer": "A",
      "whyCorrect": "Hai khe kề có hiệu đường đi $a\\sin\\theta$. Cực đại chính khi $a\\sin\\theta=k\\lambda$, k nguyên và $|k\\lambda/a|\\le1$.",
      "whyWrong": {
        "B": "Sai.",
        "C": "Khác.",
        "D": "Sai."
      }
    },
    {
      "level": "VD",
      "stem": "Từ nước $n=1{,}33$ ra không khí. $i_{gh}$",
      "choices": {
        "A": "$\\arcsin(1/1{,}33)\\approx 48{,}8^\\circ$",
        "B": "$0^\\circ$",
        "C": "$90^\\circ$ mọi tia",
        "D": "$\\arcsin(1{,}33)$ không định nghĩa"
      },
      "answer": "A",
      "whyCorrect": "$\\sin i_{gh}=n_2/n_1=1/1{,}33$.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\arcsin(1/1{,}33)\\approx 48{,}8^\\circ$.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\arcsin(1/1{,}33)\\approx 48{,}8^\\circ$.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\arcsin(1/1{,}33)\\approx 48{,}8^\\circ$."
      }
    },
    {
      "level": "VDC",
      "stem": "Phát biểu nào <strong>sai</strong>?",
      "choices": {
        "A": "ống nhòm dùng phản xạ/TIR",
        "B": "I-âng cần nguồn kết hợp",
        "C": "Malus phân cực: $I=I_0\\cos^2\\alpha$",
        "D": "ánh sáng không phải sóng EM theo Maxwell"
      },
      "answer": "D",
      "whyCorrect": "D sai. A–C đúng DC1TT23.",
      "whyWrong": {
        "A": "Đúng DCCT.",
        "B": "Đúng.",
        "C": "Đúng."
      }
    },
    {
      "level": "TH",
      "stem": "LCD / kính râm Polaroid dùng",
      "choices": {
        "A": "phân cực + Malus",
        "B": "chỉ Coulomb",
        "C": "ống dây",
        "D": "Stefan–Boltzmann bắt buộc"
      },
      "answer": "A",
      "whyCorrect": "5.4.5. LCD: polarizer + tinh thể lỏng xoay $\\alpha$.",
      "whyWrong": {
        "B": "Sai.",
        "C": "Sai.",
        "D": "Nhiệt."
      }
    }
  ],
  "essays": [
    {
      "kind": "DCCT",
      "title": "Kính tiềm vọng / ống nhòm",
      "problem": "<p>Kính tiềm vọng có hai gương phẳng song song, nghiêng $45^\\circ$ với phương ngang; tâm gương cách nhau theo phương đứng $h=40$ cm. Tia tới gương trên theo phương ngang, đi xuống gương dưới rồi tới mắt. Giải thích tia ra song song tia vào và xác định góc tới.</p>",
      "tip": "Góc tới đo với pháp tuyến gương. Gương nghiêng 45° thì pháp tuyến cũng nghiêng 45° so với tia ngang.",
      "steps": {
        "s1": "<p>Hai gương song song bố trí để đường tia giữa hai gương theo phương đứng.</p>",
        "s2": "<p>Tia ngang tới gương trên với $i=45^\\circ$, phản xạ xuống dưới. Tia đứng tới gương dưới cũng tạo $45^\\circ$ với pháp tuyến.</p>",
        "s3": "<p>Mỗi lần phản xạ đổi phương tia $90^\\circ$. Hai phản xạ trên hai gương song song cho tia ra nằm ngang, song song và cùng chiều tia vào; trục tia được dịch xuống $h=40$ cm.</p>",
        "s4": "<p>Nếu thay gương bằng lăng kính phản xạ toàn phần, phải thỏa điều kiện góc tới lớn hơn góc giới hạn tại mặt phản xạ; không phải mọi lăng kính 45° đều tự động phản xạ toàn phần.</p>"
      }
    },
    {
      "kind": "I-âng",
      "title": "Giao thoa hai khe (DCCT)",
      "problem": "<p>$\\lambda=500$ nm, $a=0{,}25$ mm, $D=1{,}0$ m. Tính $i$ và vị trí vân sáng $k=3$.</p>",
      "tip": "Đổi nm, mm.",
      "steps": {
        "s1": "<p>Hai khe kết hợp từ một $S$.</p>",
        "s2": "<p>$\\lambda=5{,}0\\times 10^{-7}$ m, $a=2{,}5\\times 10^{-4}$ m, $D=1$ m.</p>",
        "s3": "<p>$i=\\lambda D/a$, $y_k=k i$.</p>",
        "s4": "<p>$i=2{,}0$ mm; $y_3=6{,}0$ mm.</p>"
      }
    },
    {
      "kind": "TIR",
      "title": "Sợi quang",
      "problem": "<p>Lõi $n_1=1{,}50$, vỏ $n_2=1{,}45$. Tính $i_{gh}$ trong lõi (tới mặt lõi–vỏ).</p>",
      "tip": "$\\sin i_{gh}=n_2/n_1$.",
      "steps": {
        "s1": "<p>TIR giữ sáng trong lõi.</p>",
        "s2": "<p>Radian hoặc độ — nêu độ.</p>",
        "s3": "<p>$\\sin i_{gh}=1{,}45/1{,}50=0{,}9667$.</p>",
        "s4": "<p>$i_{gh}\\approx 75{,}2^\\circ$. Tia trong lõi cần $i>i_{gh}$ mới dẫn TIR.</p>"
      }
    },
    {
      "kind": "Malus",
      "title": "Hai polarizer",
      "problem": "<p>Ánh sáng tự nhiên cường độ $I_n$ qua P1 rồi P2, $\\alpha=45^\\circ$. Tính $I$ ra (bản phân cực lý tưởng: truyền hết thành phần song song trục, loại thành phần vuông góc).</p>",
      "tip": "Sau P1: $I_n/2$; rồi $\\cos^2\\alpha$.",
      "steps": {
        "s1": "<p>P1 tạo phân cực; P2 analyzer.</p>",
        "s2": "<p>$\\alpha=45^\\circ$, $\\cos^2=1/2$.</p>",
        "s3": "<p>$I=(I_n/2)\\cos^2\\alpha$.</p>",
        "s4": "<p>$I=I_n/4$.</p>"
      }
    },
    {
      "kind": "Nêm",
      "title": "Vân nêm không khí",
      "problem": "<p>Nêm không khí được chiếu gần vuông góc, $\\lambda=600$ nm, góc $\\alpha=10^{-4}$ rad. Ước khoảng vân trên mặt nêm $x=\\lambda/(2\\alpha)$.</p>",
      "tip": "Hiệu lộ $2\\alpha x$ (tới–về).",
      "steps": {
        "s1": "<p>Hai mặt nêm, phản xạ.</p>",
        "s2": "<p>$\\alpha$ đã rad.</p>",
        "s3": "<p>Vân sáng kề: $\\Delta(2\\alpha x)=\\lambda\\Rightarrow \\Delta x=\\lambda/(2\\alpha)$.</p>",
        "s4": "<p>$\\Delta x=600\\times 10^{-9}/(2\\times 10^{-4})=3{,}0$ mm.</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Nhật thực vs TIR vs I-âng",
      "problem": "<p>Phân loại hiện tượng: hình học / sóng. Một câu thực tiễn CNTT (sợi quang).</p>",
      "tip": "Không nhầm module.",
      "steps": {
        "s1": "<p>Nhật thực: truyền thẳng. TIR: khúc xạ. I-âng: sóng.</p>",
        "s2": "<p>Không cần số.</p>",
        "s3": "<p>Sợi quang = TIR + (tùy) mode sóng dẫn.</p>",
        "s4": "<p>Lab DCCT: chế ống nhòm + mô hình I-âng.</p>"
      }
    }
  ]
});
